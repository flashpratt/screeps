var rng = require('math');
var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity && creep.memory.harvesting) {
	        var dropped = creep.room.find(FIND_DROPPED_ENERGY, {filter: (orb) => {return (orb.energy > 0)}})
	        if(dropped.length > 0) {
	            next = creep.pos.findClosestByPath(dropped)
	            creep.moveTo(next)
	            creep.pickup(next)
	            return
	        }
	        if(Memory.containers.length > 0) {
	            if(creep.memory.provider == null) {
	                var range = 1000
	                for(var i = 0; i < Memory.containers.length; i++) {
	                    var chest = Game.getObjectById(Memory.containers[i])
	                    var dist = creep.pos.getRangeTo(chest)
	                    if(dist < range) {
	                        dist = range
	                        creep.memory.provider = chest.id
	                    }
	                }
	            } else {
	                var chest = Game.getObjectById(creep.memory.provider)
	                var code = creep.withdraw(chest, RESOURCE_ENERGY)
	                if(code == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(chest)
	                } else if(code == ERR_NOT_ENOUGH_RESOURCES || chest.energy < 10) {
	                    creep.memory.harvesting = false
	                    delete creep.memory.provider
	                }
	            }
	        } else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
	        }
        } else if (creep.carry.energy > creep.carryCapacity * 0.9 && creep.memory.harvesting) {
            creep.memory.harvesting = false
        } else if(creep.carry.energy == 0 && creep.memory.harvesting == false) {
            creep.memory.harvesting = true
        } else{
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER ||
                                structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                var next = creep.pos.findClosestByPath(targets)
                var err = creep.transfer(next, RESOURCE_ENERGY)
                if(err == ERR_NOT_IN_RANGE) {
                    creep.moveTo(next);
                }
            }
        }
	}
};

module.exports = roleHarvester;