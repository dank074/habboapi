
    var User				= {},
		bcrypt				= require('bcrypt'),
		hotel_user    		= require(__base + '/app/database/models/user/hotel_user').model,
		hotel_user_info     = require(__base + '/app/database/models/user/hotel_user_info').model,
        hotel_user_stats    = require(__base + '/app/database/models/user/hotel_user_stats').model;
        hotel_users   		= require(__base + '/app/database/collections/user/hotel_users').collection;

	User.user_info = function(user_id)
	{
		return new Promise(function(resolve, reject)
		{
			if(user_id == null || user_id == 0 || typeof user_id != 'number') return reject(new Error('invalid_parmeters'));

			new hotel_user({id: user_id}).fetch({columns: ['id', 'username', 'mail', 'rank', 'credits', 'vip_points', 'activity_points', 'look', 'motto', 'last_online', 'online', 'ip_last']})

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

	User.validate_username = function(user_name)
    {
        return new Promise(function(resolve, reject)
        {
            var regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{1,20}$/g;

            if(user_name == null) return reject(new Error('invalid_paramemters'));

            if(regex.test(user_name) == false) return reject(new Error('invalid_format'));
            
            new hotel_user({username: user_name}).fetch()
            
            .then(function(result)
            {
                if(result == null) return resolve(null);
                
                return reject(new Error('username_unavailable'));
            })

            .catch(function(err)
            {
                return reject(err);
            });
        });
    };

	User.validate_email = function(email_address)
    {
        return new Promise(function(resolve, reject)
        {
            var regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
            
            if(email_address == null) return reject(new Error('invalid_paramemters'));

            if(regex.test(email_address) == false) return reject(new Error('invalid_format'));

            new hotel_user({mail: email_address}).fetch()
            
            .then(function(result)
            {
                if(result == null) return resolve(null);
                
                return reject(new Error('email_unavailable'));
            })

            .catch(function(err)
            {
                return reject(err);
            });
        });
    };

	User.add_user = function(user_name, user_email, user_pass, user_ip)
	{
		return new Promise(function(resolve, reject)
		{
			if(user_name == null || user_email == null || user_pass == null || user_ip == null) return reject(new Error('invalid_paramemters'));

			User.validate_username(user_name)

			.then(function()
			{
				return User.validate_email(user_email);
			})

			.then(function()
			{
				return new hotel_user({
                    id: null,
				    username: user_name,
				    password: bcrypt.hashSync(user_pass, 10),
                    mail: user_email,
				    auth_ticket: "",
				    rank: HabboAPI.Config.new_user.rank,
				    credits: HabboAPI.Config.new_user.credits,
                    vip_points: HabboAPI.Config.new_user.pixels,
                    activity_points: HabboAPI.Config.new_user.points,
                    look: HabboAPI.Config.new_user.figure,
                    gender: HabboAPI.Config.new_user.gender,
                    motto: HabboAPI.Config.new_user.motto,
                    account_created: Math.floor(Date.now() / 1000),
                    last_online: Math.floor(Date.now() / 1000),
                    ip_last: user_ip,
                    ip_reg: user_ip,
                    home_room: HabboAPI.Config.new_user.home_room}).save(null, {method: 'insert'});
			})

			.then(function(user)
            {
                var user_json = user.toJSON();

                return new hotel_user_info({
                    user_id: user_json.id,
                    bans: 0,
                    cautions: 0,
                    reg_timestamp: Math.floor(Date.now() / 1000),
                    login_timestamp: Math.floor(Date.now() / 1000),
                    cfhs: 0,
                    cfhs_abusive: 0}).save(null, {method: 'insert'});
            })

			.then(function(user_info)
            {
                var user_info_json = user_info.toJSON();

                return new hotel_user_stats({
                    id: user_info_json.user_id}).save(null, {method: 'insert'});
            })

            .then(function()
            {
                return resolve(null);
            })

            .catch(function(err)
            {
                return reject(err);
            });
		});
	};

    module.exports = User;