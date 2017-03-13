
    var Community   = {},
		item        = require(__base + '/app/database/models/furniture/item'),
		room		= require(__base + '/app/database/models/room/room'),
        user        = require(__base + '/app/database/models/user/user'),
		user_pets	= require(__base + '/app/database/models/user/user_pets'),
		group		= require(__base + '/app/database/models/group/group'),
		permission	= require(__base + '/app/database/models/permission/permission');

	Community.community_info = function()
	{
		return new Promise(function(resolve, reject)
		{
			var community_info = {};

			return HabboAPI.Controllers.Community.latest_user()

			.then(function(result)
			{
				community_info.latest_user = result;

				return HabboAPI.Controllers.Community.statistics();
			})

			.then(function(result)
			{
				community_info.statistics = result;

				return resolve(community_info);
			})

			.catch(function(err)
			{
				return reject(err);
			});
		});
	}

	Community.latest_user = function()
	{
		return new user()
		
		.query(function(qb)
		{
			qb.orderBy('id', 'DESC').limit(1);
		})
		
		.fetch({
			columns: ['id', 'username', 'motto', 'look']
		})

		.then(function(result)
		{
			if(result == null) return Promise.reject(new Error('no_users'));

			return Promise.resolve(result.toJSON());
		},

		function reject(err)
		{
			return Promise.reject(err);
		});
	};

	Community.statistics = function()
	{
		return new Promise(function(resolve, reject)
		{
			var hotel_statistics = {};

			return new item().count()

			.then(function(result)
			{
				hotel_statistics.total_items = result;

				return new room().count()
			})

			.then(function(result)
			{
				hotel_statistics.total_rooms = result;

				return new user().count()
			})

			.then(function(result)
			{
				hotel_statistics.total_users = result;

				return new group().count()
			})

			.then(function(result)
			{
				hotel_statistics.total_groups = result;

				return new user_pets().count()
			})

			.then(function(result)
			{
				hotel_statistics.total_pets = result;

				return resolve(hotel_statistics);
			})

			.catch(function(err)
			{
				return reject(err);
			});
		});
	};

	Community.staff_users = function()
	{
		return new permission()
		
		.query(function(qb)
		{
			qb.whereIn('id', HabboAPI.Config.staff_page_ranks).orderBy('id', 'DESC');
		})
		
		.fetchAll({
			withRelated: [
				{'users': function(qb) {
					qb.column('id', 'username', 'motto', 'look', 'rank');
				}}
			],
			columns: ['id', 'rank_name']
		})
		
		.then(function resolve(result)
		{
			if(result == null) return Promise.reject(new Error('no_staff'));

			var ranks = result.toJSON();

			return Promise.resolve(ranks);
		},

		function reject(err)
		{
			return Promise.reject(err);
		});
	};

    module.exports = Community;