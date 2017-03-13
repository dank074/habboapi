require(__base + '/app/database/models/group/group');
require(__base + '/app/database/models/user/user');

var GroupMembers = HabboAPI.Adapter.Model.extend({
	tableName: 'guilds_members',
	hasTimestamps: false,
	group: function() { return this.belongsTo('Group', 'guild_id')},
	user: function() { return this.belongsTo('User', 'user_id')}
});

module.exports = HabboAPI.Adapter.model('GroupMembers', GroupMembers);