/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('math');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    random: function(typeList) {
        return Math.floor(Math.random() * typeList.length)
    },
    allWallsandStructures: function(creep) {
        return creep.room.find(Game.STRUCTURES, {filter:function(structure) {
            return structure.structureType == "road" || structure.structureType == "constructedWall";
        }})
    }
};