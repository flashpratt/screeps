var rng = require('math');
var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.harvesting]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.harvesting]);
            }
            
        } else {
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