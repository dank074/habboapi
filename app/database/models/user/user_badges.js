require(__base + '/app/database/models/user/user');

var UserBadges = HabboAPI.Adapter.Model.extend({
	tableName: 'users_badges',
	hasTimestamps: false,
    users: function() { return this.belongsToMany('User', 'user_id')}
});

module.exports = HabboAPI.Adapter.model('UserBadges', UserBadges);