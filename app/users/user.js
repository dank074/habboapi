
    var User		= {},
		hotel_user    = require(__base + '/app/database/models/user/hotel_user').model,
        hotel_users   = require(__base + '/app/database/collections/user/hotel_users').collection;

    User.user_list = function()
    {
        new hotel_users.fetch()

		.then(function(results)
		{
			if(results == null) return null;

			return results.toJSON();
		})
		
		.catch(function(err)
		{
             return null;
		});
    };

	User.user_info = function(user_id)
	{
		return new Promise(function(resolve, reject)
		{
			if(user_id == null || typeof user_id != 'number') return reject(new Error('invalid_parameters'));

			new hotel_user({id: user_id}).fetch({columns: ['id', 'username', 'mail', 'rank']})

			.then(function(result)
			{
				if(result == null) return reject(new Error('invalid_user'));

				return resolve(result.toJSON());
			})
			
			.catch(function(err)
			{
				return reject(err);
			});
		});
	};

    module.exports = User;