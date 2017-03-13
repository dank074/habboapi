require(__base + '/app/database/models/user/user');
require(__base + '/app/database/models/room/room');

var UserPets = HabboAPI.Adapter.Model.extend({
	tableName: 'users_pets',
	hasTimestamps: false,
    owner: function() { return this.belongsTo('User', 'user_id')},
    room: function() { return this.belongsTo('Room', 'room_id')}
});

module.exports = HabboAPI.Adapter.model('UserPets', UserPets);