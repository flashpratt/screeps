/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.update');
 * mod.thing == 'a thing'; // true
 */
Memory.hs = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
Memory.us = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
Memory.bs = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
Memory.ms = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
Memory.rs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');

module.exports = {
    run: function() {
        //remove old creeps from memory
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                console.log(name,Game.creeps, Memory.creeps, creep)
                var creep = Memory.creeps[name]
                switch(creep.role) {
                    case('harvester'):
                        Memory.hs--
                        break;
                    case('builder'):
                        Memory.bs--
                        break;
                    case('miner'):
                        Memory.ms--
                        break;
                    case('upgrader'):
                        Memory.us--
                        break;
                    case('repair'):
                        Memory.rs--
                        break;
                    default:
                    console.log('error on unit death')
                        break;
                }
                delete creep;
                Memory.pop--
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
};