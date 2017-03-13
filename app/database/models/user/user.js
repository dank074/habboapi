require(__base + '/app/database/models/user/user_badges');
require(__base + '/app/database/models/user/user_settings');
require(__base + '/app/database/models/room/room');
require(__base + '/app/database/models/messenger/messenger_friendships');
require(__base + '/app/database/models/group/group');
require(__base + '/app/database/models/group/group_members');
require(__base + '/app/database/models/api/login_log');

var User = HabboAPI.Adapter.Model.extend({
	tableName: 'users',
	hasTimestamps: false,
	badges: function() { return this.hasMany('UserBadges', 'user_id', 'id')},
	settings: function() { return this.hasOne('UserSettings', 'user_id', 'id')},
	rooms: function() { return this.hasMany('Room', 'owner_id', 'id')},
	friends: function() { return this.hasMany('MessengerFriendships', 'user_one_id', 'id')},
	groups: function() { return this.hasMany('Group', 'user_id', 'id')},
	group_memberships: function() { return this.hasMany('GroupMembers', 'user_id', 'id')},
	logins: function() { return this.hasMany('LoginLog', 'user_id', 'id')},
	last_login: function() { return this.logins().query(function(qb) { qb.orderBy('id', 'DESC').offset(1).limit(1); })}
});

module.exports = HabboAPI.Adapter.model('User', User);