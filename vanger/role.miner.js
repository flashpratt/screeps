/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn');
 * mod.thing == 'a thing'; // true
 */
 var math = require('math')

var roleMiner = {
	run: function(creep) {
		var sources = creep.room.find(FIND_SOURCES)
		if(creep.carry.energy < creep.carryCapacity) {
		    var harv = creep.harvest(sources[creep.memory.node])
			if(harv == ERR_NOT_IN_RANGE){
				creep.moveTo(sources[creep.memory.node]);
			} else if(harv == OK){
			    creep.memory.setup = true
			}
		}
		
	    var targets = creep.room.find(FIND_MY_CREEPS)
		for(var x = 0; x < targets.length; x++) {
		    creep.transfer(targets[x], RESOURCE_ENERGY)
		}
		
		if(creep.memory.setup) {
    		if(creep.memory.chest == null) {
    		    creep.memory.chest = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}}).id
    		} else {
    		    creep.transfer(Game.getObjectById(creep.memory.chest), RESOURCE_ENERGY)
            }
		}
	}
}
module.exports = roleMiner;