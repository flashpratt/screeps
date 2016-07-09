var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleRepair = require('role.repairer');
var spawnWorkers = require('spawn');
var memUpdate = require('memory.update');

var HARVESTERS = 4;
var UPGRADERS = 4;
var BUILDERS = 2;
var MINERS = 2;
var REPAIRS = 2;

Memory.turn = 1
Memory.pop = 0
for(var i in Game.creeps) {Memory.pop++}

module.exports.loop = function () {
    //Do low-latency map-updates to memory
    switch(Memory.turn) {
        case(1):
            Memory.energy1 = Game.spawns.Spawn1.room.energyAvailable
            break;
        case(2):
            break;
        case(3):
            break;
        case(4):
            break;
        case(5):
            break;
        case(6):
            break;
        case(7):
            break;
        case(8):
            break;
        case(9):
            break;
        case(10):
            Memory.turn = 0;
            break;
        default:
            //Do nothing :(
            break;
    }
    memUpdate.run()
    Memory.turn++;

    //tower AI
    var tower = Game.getObjectById('577ec77ebfcc30e350309403');
    if(tower) {
        /*var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }*/

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
    //Spawn new creeps
	if (Memory.hs < HARVESTERS) {
        spawnWorkers.harvester(Memory.hs)    	
	}
	else if(Memory.ms < MINERS) {
		spawnWorkers.miner(Memory.ms)   	
	}
	else if(Memory.us < UPGRADERS) {
	    spawnWorkers.upgrader(Memory.us)  	
	}
	else if(Memory.rs < REPAIRS) {
	    spawnWorkers.repair(Memory.rs)
	}
	else if((Memory.bs < BUILDERS) && (FIND_CONSTRUCTION_SITES > 0)) {
		spawnWorkers.builder(Memory.bs)    	
	}

    //Control creeps
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            if(roleBuilder.run(creep) == -1) {
                creep.memory.salvage = 1
            }
        }
		else if(creep.memory.role == 'miner') {
			roleMiner.run(creep)
		} else if(creep.memory.role = 'repair') {
		    roleRepair.run(creep)
		}
    }
}