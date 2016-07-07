/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
/** Spawn a harvester: Collects energy to storage **/
    harvester: function(currList) {	
        for(var i = 0; i <= currList.length; i++) {
            for(var j in Game.creeps) {
                if(j == ("Harvester" + i)) {
                } else {
					var x = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], "Harvester" + i, {role: 'harvester', harvesting: (i % 2)})
					this.logError(x)
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
					this.logError(x, crpName)
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
					this.logError(x, crpName)
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
					var x = Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, MOVE], crpName, {role: 'miner', node: (i % 2)})
					this.logError(x, crpName)
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
					this.logError(x, crpName)
                }
            }        
        }
	},
	logError: function(x , crpName) {
	    if( x == 0) {
			console.log("Spawned new repair" + i)
		} else if(x == -6 || x == -4) {
			return;
		} else {
			console.log("Failed to create spawn " + x)
		}
	}
};