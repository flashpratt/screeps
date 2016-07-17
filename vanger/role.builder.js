var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var structs = require('math');
        if(creep.memory.salvage == 1) {
            Game.spawns.Spawn1.recycleCreep(creep)
            creep.moveTo(Game.spawns.Spawn1)
        } else if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    } else if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
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
	        }
	    }
	    return 0
	}
};

module.exports = roleBuilder;