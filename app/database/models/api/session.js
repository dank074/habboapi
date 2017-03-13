require(__base + '/app/database/models/user/user');

var Sessions = HabboAPI.Adapter.Model.extend({
	tableName: 'api_sessions',
	hasTimestamps: true,
	user: function() { return this.belongsTo('User', 'user_id')}
});

module.exports = HabboAPI.Adapter.model('Sessions', Sessions);