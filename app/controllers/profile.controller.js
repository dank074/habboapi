
    var Profile     = {},
		user        = require(__base + '/app/database/models/user/user');

	Profile.profile_info = function(user_name)
	{
		if(user_name == null) return Promise.reject(new Error('invalid_paramemters'));
        
		return new user({username: user_name})
		
		.fetch({
			withRelated: [
				{'badges': function(qb) {
					qb.column('user_id', 'slot_id', 'badge_code');
				}},
				{'rooms': function(qb) {
					qb.column('id', 'owner_id', 'name', 'description', 'model', 'score');
				}},
				{'group_memberships': function(qb) {
					qb.column('id', 'user_id', 'guild_id', 'member_since');
				}},
				{'group_memberships.group': function(qb) {
					qb.column('id', 'name', 'description', 'badge');
				}},
				{'friends': function(qb) {
					qb.column('user_one_id', 'user_two_id', 'friends_since');
				}},
				{'friends.user': function(qb) {
					qb.column('id', 'username', 'motto', 'look');
				}}
			],
			columns: ['id', 'username', 'account_created', 'motto', 'look', 'online']
		})
		
		.then(function resolve(result)
		{
			if(result == null) return Promise.reject(new Error('invalid_user'));

			return Promise.resolve(result.toJSON());
		},
		
		function reject(err)
		{
			return Promise.reject(err);
		});
	};

    module.exports = Profile;