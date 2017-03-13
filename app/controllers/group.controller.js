
    var Group     = {},
		group     = require(__base + '/app/database/models/group/group');

	Group.group_info = function(group_id)
	{
		if(group_id == null) return Promise.reject(new Error('invalid_paramemters'));
        
		return new group({id: group_id})
		
		.fetch({
			withRelated: [
				{'owner': function(qb) {
					qb.column('id', 'username', 'look');
				}},
				{'members': function(qb) {
					qb.column('id', 'guild_id', 'user_id', 'level_id', 'member_since');
				}},
				{'members.user': function(qb) {
					qb.column('id', 'username', 'motto', 'look');
				}},
				{'room': function(qb) {
					qb.column('id', 'owner_id', 'name', 'model');
				}},
				{'room.owner': function(qb) {
					qb.column('id', 'username');
				}}
			],
			columns: ['id', 'user_id', 'name', 'description', 'room_id', 'badge', 'date_created']
		})
		
		.then(function resolve(result)
		{
			if(result == null) return Promise.reject(new Error('invalid_group'));

			return Promise.resolve(result.toJSON());
		},
		
		function reject(err)
		{
			return Promise.reject(err);
		});
	};

    module.exports = Group;