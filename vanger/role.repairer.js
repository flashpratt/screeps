/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repairer');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep) {
        if(creep.memory.repair && creep.carry.energy == 0) {
            creep.memory.repair = false;
        }
        if(!creep.memory.repair && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repair = true;
        }
		if(creep.memory.repair) {
			var roadToRepair = creep.room.find(FIND_STRUCTURES, {
                filter: function(object){
                    return ((object.structureType === STRUCTURE_ROAD && (object.hits < object.hitsMax * 0.9)) || (object.structureType === STRUCTURE_WALL && (object.hits < 1000)));
                } 
            });
            if (roadToRepair == null){
                var X = creep.pos.findClosestByRange(roadToRepair)
                if(creep.repair(X) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(X);   
                }
            } else {
                var wallToRepair = creep.room.find(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType === STRUCTURE_WALL && (object.hits < object.hitsMax);
                    } 
                });
                if(wallToRepair != null) {
                    var X = creep.pos.findClosestByRange(wallToRepair)
                    if(creep.repair(X) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(X);   
                    }
                }
            }
		} else {
		    var nrg = creep.room.find(FIND_SOURCES)
		    if(creep.harvest(nrg[0]) == ERR_NOT_IN_RANGE) {
		        creep.moveTo(nrg[0])
		    }
		}
    }
};