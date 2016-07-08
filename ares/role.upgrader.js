//tutorial role.upgrader module
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

      //if we have no energy, set task to recharge
      if(creep.carry.energy === 0) {
            creep.memory.task = 'recharge';
      }
      //if we have full energy, set task to upgrade
      if(creep.carry.energy >= creep.carryCapacity) {
            creep.memory.task = 'upgrade';
      }
      //if we are recharging, find sources and harvest or move if out of range
	    if(creep.memory.task == 'recharge') {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
      //if we are upgrading, find the room controller and upgrade or move if out of range
      else if (creep.memory.task == 'upgrade') {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
      }
	}
};

module.exports = roleUpgrader;
