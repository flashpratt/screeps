//a creep who harvests energy and stores it in thean adjacent container
var roleRepairbot = {


  /** @param {Creep} creep **/
  run: function(creep) {

    //if we have no energy, set task to recharge
    if(creep.carry.energy === 0) {
          creep.memory.task = 'recharge';
    }
    //if we have full energy, set task to repair
    if(creep.carry.energy >= creep.carryCapacity) {
          creep.memory.task = 'repair';
    }
    //if we are repairing, find nearest repair site, move to it and then repair
    if(creep.memory.task == 'repair'){
      var repairTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: function(object){
          if(object.hits === object.hitsMax) {
            return false;
          }
          if(object.hits < object.hitsMax) {
            return true;
          }
        }

      });
            creep.moveTo(repairTarget);
            creep.repair(repairTarget);
    };

    //if we are recharging, find sources and harvest or move if out of range
    if(creep.memory.task == 'recharge') {
          var sources = creep.room.find(FIND_SOURCES);
          if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(sources[0]);
          }
      }
  }

};


module.exports = roleRepairbot;
