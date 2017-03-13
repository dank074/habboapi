require(__base + '/app/database/models/user/user');
require(__base + '/app/database/models/room/room');
require(__base + '/app/database/models/furniture/item_base');

var Item = HabboAPI.Adapter.Model.extend({
	tableName: 'items',
	hasTimestamps: false,
	owner: function() { return this.belongsTo('User', 'user_id')},
    room: function() { return this.belongsTo('Room', 'room_id')},
    item_base: function() { return this.hasOne('ItemBase', 'id', 'item_id')}
});

module.exports = HabboAPI.Adapter.model('Item', Item);