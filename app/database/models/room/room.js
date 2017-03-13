require(__base + '/app/database/models/user/user');
require(__base + '/app/database/models/group/group');

var Room = HabboAPI.Adapter.Model.extend({
	tableName: 'rooms',
	hasTimestamps: false,
	owner: function() { return this.belongsTo('User', 'owner_id')},
	group: function() { return this.belongsTo('Group', 'guild_id')}
});

module.exports = HabboAPI.Adapter.model('Room', Room);