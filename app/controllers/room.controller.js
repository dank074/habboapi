
    var Room    = {},
		room    = require(__base + '/app/database/models/room/room');

	Room.room_info = function(room_id)
	{
		if(room_id == null) return Promise.reject(new Error('invalid_paramemters'));

		return new room({id: room_id})
		
		.fetch({
			withRelated: [
				{'owner': function(qb) {
					qb.column('id', 'username', 'motto', 'look');
				}},
				{'group': function(qb) {
					qb.column('id', 'name', 'badge');
				}}
			],
			columns: ['id', 'owner_id', 'name', 'description', 'model', 'state', 'users', 'users_max', 'guild_id', 'score', 'tags', 'is_public', 'promoted']
		})
		
		.then(function resolve(result)
		{
			if(result == null) return Promise.reject(new Error('invalid_room'));
			
			return Promise.resolve(result.toJSON());
		},
	
		function reject(err)
		{
			return Promise.reject(err);
		});
	};

    module.exports = Room;