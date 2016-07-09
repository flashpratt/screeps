//tutorial harvester role module
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        //if we have no energy, set task to recharge
        if(creep.carry.energy === 0) {
            creep.memory.task = 'recharge';
        }
        //if we have full energy, set task to upgrade
        if(creep.carry.energy >= creep.carryCapacity) {
            creep.memory.task = 'deliver_energy';
        }
        
	    if(creep.memory.task == 'recharge') {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
        if(creep.memory.task == 'deliver_energy') {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
	}
};

module.exports = roleHarvester;