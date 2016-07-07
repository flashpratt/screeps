var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleRepair = require('role.repairer');
var spawnWorkers = require('spawn');

var HARVESTERS = 4;
var UPGRADERS = 3;
var BUILDERS = 2;
var MINERS = 2;
var REPAIRS = 1;

module.exports.loop = function () {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }


    var tower = Game.getObjectById('ced19129ec76cc169644e0cf');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
	var hs = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
	var us = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
	var bs = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
	var ms = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
	var rs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
	if (hs.length < HARVESTERS) {
        spawnWorkers.harvester(hs)
	console.log('H ' + hs.length + ' U ' + us.length + ' B ' + bs.length + ' M ' + ms.length + ' R ' + rs.length)    	
	}
	else if(ms.length < MINERS) {
		spawnWorkers.miner(ms)
	console.log('H ' + hs.length + ' U ' + us.length + ' B ' + bs.length + ' M ' + ms.length + ' R ' + rs.length)    	
	}
	else if(us.length < UPGRADERS) {
	    spawnWorkers.upgrader(us)
	console.log('H ' + hs.length + ' U ' + us.length + ' B ' + bs.length + ' M ' + ms.length + ' R ' + rs.length)    	
	}
	else if(rs.length < REPAIRS) {
	    spawnWorkers.repair(rs)
	console.log('H ' + hs.length + ' U ' + us.length + ' B ' + bs.length + ' M ' + ms.length + ' R ' + rs.length)
	}
	else if(bs.length < BUILDERS && FIND_CONSTRUCTION_SITES > 0) {
		spawnWorkers.builder(bs)
	console.log('H ' + hs.length + ' U ' + us.length + ' B ' + bs.length + ' M ' + ms.length + ' R ' + rs.length)    	
	}
	else {
	    var percentage = Math.random * 100
	    if(percentage > 80) {
	        spawnWorkers.repair(rs)
	    } else if(percentage > 70 && percentage <= 80 ) {
	        spawnWorkers.builder(bs)
	    } else if(percentage > 40 && percentage <= 70) {
	        spawnWorkers.upgrader(us)
	    } else if(percentage > 0 && percentage <= 40) {
	        spawnWorkers.harvester(hs)
	    }
	}

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