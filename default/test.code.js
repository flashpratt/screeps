//code examples for harvesters
if(creep.carry[RESOURCE_ENERGY] === 0) { /*harvest*/ }
else {/*upgrade*/}

if(_.sum(creep.carry) < creep.carryCapacity) { /*harvest*/ }
else {/*upgrade*/}


//repair nearest rampart
var upgradeTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
 filter: function(object) {
   return object.structureType == STRUCTURE_RAMPART && object.hits < 1000;
 }
});

