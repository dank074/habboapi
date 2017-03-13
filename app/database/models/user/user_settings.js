require(__base + '/app/database/models/user/user');

var UserSettings = HabboAPI.Adapter.Model.extend({
	tableName: 'users_settings',
	hasTimestamps: false,
    user: function() { return this.belongsTo('User', 'user_id')}
});

module.exports = HabboAPI.Adapter.model('UserSettings', UserSettings);