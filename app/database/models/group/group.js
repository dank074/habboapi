require(__base + '/app/database/models/user/user');
require(__base + '/app/database/models/group/group_members');
require(__base + '/app/database/models/room/room');

var Group = HabboAPI.Adapter.Model.extend({
	tableName: 'guilds',
	hasTimestamps: false,
	owner: function() { return this.belongsTo('User', 'user_id')},
	members: function() { return this.hasMany('GroupMembers', 'guild_id', 'id')},
	room: function() { return this.hasOne('Room', 'id', 'room_id')}
});

module.exports = HabboAPI.Adapter.model('Group', Group);