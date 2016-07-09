/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn');
 * mod.thing == 'a thing'; // true
 */
 var BASIC = [WORK,CARRY,MOVE]

module.exports = {
/** Spawn a harvester: Collects energy to storage **/
    harvester: function(currList) {	
        for(var i = 0; i <= currList.length; i++) {
            for(var j in Game.creeps) {
                if(j == ("Harvester" + i)) {
                } else {
					var x = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], "Harvester" + i, {role: 'harvester', harvesting: (i % 2)})
					this.logError(x, 'harvester')
                }
            }        
        }
    },
	/** Spawn an upgrader: brings energy to Control Tower **/
    upgrader: function(currList) {
        for(var i = 0; i <= currList.length; i++) {
            for(var j in Game.creeps) {
                var crpName = "Upgrader" + i
                if(j == (crpName)) {
                } else {
					var x = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], crpName, {role: 'upgrader'})
					this.logError(x, 'upgrader')
                }
            }        
        }
    },
	/** Spawn a builder: builds roads/buildings **/
    builder: function(currList) {
        for(var i = 0; i <= currList.length; i++) {
            for(var j in Game.creeps) {
                var crpName = "Builder" + i
                if(j == (crpName)) {
                } else {
					var x = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], crpName, {role: 'builder'})
					this.logError(x, 'builder')
                }
            }        
        }
    },
	/** Spawn a miner: mines really fast, then transfers to nearby bots **/
	miner: function(currList) {
		for(var i = 0; i <= currList.length; i++) {
            for(var j in Game.creeps) {
                var crpName = "Miner" + i
                if(j == (crpName)) {
                } else {
					var x = Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], crpName, {role: 'miner', node: (i % 2)})
					this.logError(x, 'miner')
                }
            }        
        }
	},
	repair: function(currList) {
	    for(var i = 0; i <= currList.length; i++) {
            for(var j in Game.creeps) {
                var crpName ="Repair" + i
                if(j == (crpName)) {
                } else {
					var x = Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], crpName, {role: 'repair', repair: 0})
					this.logError(x, 'repair')
                }
            }        
        }
	},
	logError: function(x, role) {
	    if( _.isString(x)) {
			console.log("Spawned new " + x)
	        Memory.pop++;
	        switch(role) {
                    case('harvester'):
                        Memory.hs++
                        break;
                    case('builder'):
                        Memory.bs++
                        break;
                    case('miner'):
                        Memory.ms++
                        break;
                    case('upgrader'):
                        Memory.us++
                        break;
                    case('repair'):
                        Memory.rs++
                        break;
                    default:
                    console.log("error on new unit count")
                        break;
                }
		}
	}
};