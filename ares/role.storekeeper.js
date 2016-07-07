//a creep who harvests energy and stores it in thean adjacent container
var roleStorekeeper = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var arrived = false;
        var sources = creep.room.find(FIND_SOURCES);
        var target = sources[0];
        var storageTarget = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: function(object){
                return object.structureType == STRUCTURE_CONTAINER;
            }
        });
        
        if(creep.pos.isNearTo(target)) {
            var arrived = true;
        }
        if(arrived == false){
            creep.moveTo(target);
        }
        if(creep.energy > creep.energyCapacity/2){
            creep.transferEnergy(storageTarget)
        }
        if(arrived == true){
            creep.harvest(target)
        }
    }
};

module.exports = roleStorekeeper;