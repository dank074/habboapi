require(__base + '/app/database/models/user/user');

var MessengerFriendships = HabboAPI.Adapter.Model.extend({
	tableName: 'messenger_friendships',
	hasTimestamps: false,
	user: function() { return this.belongsTo('User', 'user_two_id')}
});

module.exports = HabboAPI.Adapter.model('MessengerFriendships', MessengerFriendships);