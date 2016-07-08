//a creep who harvests energy and stores it in thean adjacent container
var roleRepairbot = {


  /** @param {Creep} creep **/
  run: function(creep) {
    var sources = creep.room.find(FIND_SOURCES);

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
      var repairTarget = creep.pos.findClosest(FIND_STRUCTURES, {
        filter: function(object){
          if(object.hits > object.hitsMax / 2) {
            return false;
          }
          return true;
        }

      });
            creep.moveTo(repairTarget);
            creep.repair(repairTarget);
    };

    if(creep.memory.task == 'recharge'){
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    }
  }

};


module.exports = roleRepairbot;
