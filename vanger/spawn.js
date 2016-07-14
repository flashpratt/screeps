/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn');
 * mod.thing == 'a thing'; // true
 */
 var BASIC = [WORK,CARRY,MOVE]
 var TRANS = [CARRY, MOVE]
 //var CART = [CARRY, CARRY, MOVE, MOVE]    //WIP: make "cars" to carry energy between points?

module.exports = {
    carrier: function(currList) {
        var crpName
        for(var i = 0; i <= currList.length; i++) {
            crpName = "Carrier" + i
            if(crpName in Game.creeps) {
                if(i == currList.length) {
                    return
                }
                continue;
            } else {
                break;
            }
        }
            
        var body = TRANS
        var baseCost = 100
        
    },
    /** Spawn a harvester: Collects energy to storage **/
    harvester: function(currList) {	
        var i = Game.time % 100
        var crpName = "Harvester" + i
        var body = BASIC
        var baseCost = 200
        if(Memory.ms.length > 0) {
            var body = TRANS
            baseCost = 100
        }
        for(var nrg = Memory.energy1 - baseCost; nrg > 100;) {
            body.push(CARRY)
            nrg -= 50
            body.push(MOVE)
            nrg -= 50
        }
        if(nrg > 50) {
            body.push(CARRY)
        }
		var x = Game.spawns.Spawn1.createCreep(body, crpName, {role: 'harvester', harvesting: (true)})
		this.logError(x, 'harvester')
    },
	/** Spawn an upgrader: brings energy to Control Tower **/
    upgrader: function(currList) {
        var i = Game.time % 100
        var crpName = "Upgrader" + i
        var body = BASIC
        var toggle = false
        var nrg = Memory.energy1 - 200
        while(nrg > 50) {
            if( nrg > 100) {
                body.push(WORK)
                nrg -= 100
            }
            if(nrg > 50) {
                body.push(CARRY)
                nrg -= 50
            }
            if(nrg > 50) {
                body.push(CARRY)
                nrg -= 50
            }
            if(nrg > 50) {
                body.push(MOVE)
                nrg -= 50
            }
        }
        
		var x = Game.spawns.Spawn1.createCreep(body, crpName, {role: 'upgrader'})
		this.logError(x, 'upgrader')
    },
	/** Spawn a builder: builds roads/buildings **/
    builder: function(currList) {
        var i = Game.time % 100
        var crpName = "Builder" + i
        var body = BASIC
        var toggle = false
        for(var nrg = Memory.energy1 - 200; nrg > 100;) {
            if(toggle) {
                body.push(WORK)
                nrg -= 100
            } else {
                body.push(CARRY)
                nrg -= 50
                body.push(MOVE)
                nrg -= 50
            }
            toggle = !toggle
        }
        if(nrg > 50) {
            body.push(MOVE)
        }
		var x = Game.spawns.Spawn1.createCreep(body, crpName, {role: 'builder', building: false})
		this.logError(x, 'builder')
    },
	/** Spawn a miner: mines really fast, then transfers to nearby bots **/
	miner: function(currList) {
        var i = Game.time % 100
        var node = 0
        var crpName = "Miner" + node
        if(crpName in Game.creeps) {
            node = 1
            crpName = "Miner" + node
        }
        var body = BASIC
        var toggle = false
        for(var nrg = Memory.energy1 - 200; nrg > 100;) {
                body.push(WORK)
                nrg -= 100
        }
        if(nrg > 50) {
            body.push(MOVE)
        }
		var x = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], crpName, {role: 'miner', node: (node)})
		this.logError(x, 'miner')
	},
	repair: function(currList) {
        var i = Game.time % 100
        var crpName = "Repair" + i
        var body = BASIC
        var toggle = false
        for(var nrg = Memory.energy1 - 200; nrg > 100;) {
            if(toggle) {
                body.push(WORK)
                nrg -= 100
            } else {
                body.push(CARRY)
                nrg -= 50
                body.push(MOVE)
                nrg -= 50
            }
            toggle = !toggle
        }
        if(nrg > 50) {
            body.push(MOVE)
        }
		var x = Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], crpName, {role: 'repair', repair: false})
		this.logError(x, 'repair')
	},
	logError: function(x, role) {
	    if( _.isString(x)) {
			console.log("Spawned new " + x)
	        Memory.pop++;
	        switch(role) {
                    case('harvester'):
                        Memory.hs.push(Game.creeps[x])
                        break;
                    case('builder'):
                        Memory.bs.push(Game.creeps[x])
                        break;
                    case('miner'):
                        Memory.ms.push(Game.creeps[x])
                        break;
                    case('upgrader'):
                        Memory.us.push(Game.creeps[x])
                        break;
                    case('repair'):
                        Memory.rs.push(Game.creeps[x])
                        break;
                    default:
                    console.log("error on new unit count")
                        break;
                }
		}
	}
};