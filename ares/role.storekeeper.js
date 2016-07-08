//a creep who harvests energy and stores it in thean adjacent container
var roleStorekeeper = {

  /** @param {Creep} creep **/
  run: function(creep) {

    //if we have no energy, set task to recharge
    if(creep.carry.energy === 0) {
          creep.memory.task = 'recharge';
    }
    //if we have full energy, set task to store energy
    if(creep.carry.energy >= creep.carryCapacity) {
          creep.memory.task = 'chargeStorage';
    }
    //if we are recharging, find sources and harvest or move if out of range
    if(creep.memory.task == 'recharge') {
          var sources = creep.room.find(FIND_SOURCES);
          if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(sources[0]);
          }
      }
    //if we are chargingStorage, find nearest uncharged storage and charge it
    else if (creep.memory.task == 'chargeStorage') {
      //TO DO: add code here
    }
}
};


module.exports = roleStorekeeper;
