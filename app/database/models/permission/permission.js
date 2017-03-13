require(__base + '/app/database/models/user/user');

var Permission = HabboAPI.Adapter.Model.extend({
	tableName: 'permissions',
	hasTimestamps: false,
	users: function() { return this.hasMany('User', 'rank', 'id')}
});

module.exports = HabboAPI.Adapter.model('Permission', Permission);