/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.update');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    collectDead: function() {
        //remove old creeps from memory
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                var creep = Memory.creeps[name]
                switch(creep.role) {
                    case('harvester'):
                        Memory.hs.pop(creep)
                        break;
                    case('builder'):
                        Memory.bs.pop(creep)
                        break;
                    case('miner'):
                        Memory.ms.pop(creep)
                        break;
                    case('upgrader'):
                        Memory.us.pop(creep)
                        break;
                    case('repair'):
                        Memory.rs.pop(creep)
                        break;
                    default:
                    console.log('error on unit death')
                        break;
                }
                console.log('Clearing non-existing creep memory:', name);
                delete Memory.creeps[name];
                Memory.pop--
            }
        }
    }
};