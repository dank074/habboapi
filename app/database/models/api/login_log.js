require(__base + '/app/database/models/user/user');

var LoginLog = HabboAPI.Adapter.Model.extend({
	tableName: 'api_loginlog',
	hasTimestamps: true,
	user: function() { return this.belongsTo('User', 'user_id')}
});

module.exports = HabboAPI.Adapter.model('LoginLog', LoginLog);