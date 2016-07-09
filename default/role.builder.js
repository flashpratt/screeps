var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var structs = require('math');
        if(creep.memory.salvage == 1) {
            Game.spawns.Spawn1.recycleCreep(creep)
            creep.moveTo(Game.spawns.Spawn1)
        }

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        var next = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(next) {
                if(creep.build(next) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(next);
                }
            } else {
                return -1   //signify to salvage
            }
	    }
	    else {
	        var next = creep.pos.findClosestByPath(FIND_SOURCES)
            if(creep.harvest(next) == ERR_NOT_IN_RANGE) {
                creep.moveTo(next);
            }
	    }
	    return 0
	}
};

module.exports = roleBuilder;