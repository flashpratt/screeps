var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleRepair = require('role.repairer');
var spawnWorkers = require('spawn');
var memUpdate = require('memory.update');

var HARVESTERS = 2;
var UPGRADERS = 2;
var BUILDERS = 1;
var MINERS = 2;
var REPAIRS = 1;

Memory.turn = 1
Memory.pop = 0
for(var i in Game.creeps) {Memory.pop++}

module.exports.loop = function () {
    memUpdate.collectDead() //Clear dead creeps IMMEDIATELY before doing any spawning/checking
    //Do low-latency map-updates to memory
    switch(Memory.turn) {
        case(1):
            Memory.energy1 = Game.spawns.Spawn1.room.energyAvailable
            Memory.foundations = Game.spawns.Spawn1.room.find(Game.constructionSites)
            var containers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] >= 500)
                }
            })
            var array = []
            for(i = 0; i < containers.length; i++) {
                array.push(containers[i].id)
            }
            Memory.containers = array
            break;
        case(2):
            Memory.cs = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
            break;
        case(3):
            Memory.hs = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            Memory.us = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            Memory.bs = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            Memory.ms = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
            Memory.rs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
            break;
        case(4):
            //Spawn new creeps
            if (Memory.hs.length < HARVESTERS) {
                if(Memory.ms.length < 1) {
                    spawnWorkers.harvester(Memory.hs)
                } else {
                    //spawnWorkers.carrier(Memory.cs)
                }
                spawnWorkers.harvester(Memory.hs)
            }
            else if(Memory.ms.length < MINERS) {
            	spawnWorkers.miner(Memory.ms)
            }
            else if(Memory.us.length < UPGRADERS) {
                spawnWorkers.upgrader(Memory.us)
            }
            else if(Memory.rs.length < REPAIRS) {
                spawnWorkers.repair(Memory.rs)
            }
            else if((Memory.bs.length < BUILDERS) /*&& (Memory.foundations.length > 0)*/) {
            	spawnWorkers.builder(Memory.bs)
            }
            break;
        case(5):
            //Memory.containers
            //var structures = Game.spawns.Spawn1.room.find(FIND_STRUCTURES)
            //Memory.containers = _.filter(structures, function(structure) {return (structure.structureType === STRUCTURE_CONTAINER)})
            //break;
        //case(6):
        //    break;
        //case(7):
        //    break;
        //case(8):
        //    break;
        //case(9):
        //    break;
        //case(10):
            Memory.turn = 0;
            break;
        default:
            //Do nothing :(
            break;
    }
    //console.log("rs " + Memory.rs.length + " us " + Memory.us.length + " hs " + Memory.hs.length + " ms " + Memory.ms.length + " bs " + Memory.bs.length)
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