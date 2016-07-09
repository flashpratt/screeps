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
			if(creep.harvest(sources[creep.memory.node]) == ERR_NOT_IN_RANGE){
				creep.moveTo(sources[creep.memory.node]);
			}
		}
	//	creep.find(FIND_MY_CREEPS, {filter: function(object) {return object.memoryy.role == 'Harvester'}})
	
	    var targets = creep.room.find(FIND_MY_CREEPS)
		//var targets = _.filter(Game.creeps, {filter(object) {return (object.pos.x - creep.pos.x)}});
		for(var x = 0; x < targets.length; x++) {
		creep.transfer(targets[x], RESOURCE_ENERGY)
		}
	}
}
module.exports = roleMiner;