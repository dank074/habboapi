require(__base + '/app/database/models/user/user');

var UserAchievements = HabboAPI.Adapter.Model.extend({
	tableName: 'users_achievements',
	hasTimestamps: false,
    users: function() { return this.belongsToMany('User', 'user_id')}
});

module.exports = HabboAPI.Adapter.model('UserAchievements', UserAchievements);