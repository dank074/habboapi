
    var User            = {},
		bcrypt          = require('bcrypt'),
		user           	= require(__base + '/app/database/models/user/user'),
        user_settings   = require(__base + '/app/database/models/user/user_settings');

    User.validate_username = function(user_name)
    {
        var regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{1,20}$/g;
        
        if(user_name == null) return Promise.reject(new Error('invalid_paramemters'));
        
        if(regex.test(user_name) == false) return Promise.reject(new Error('invalid_format'));
        
        return new user({username: user_name}).fetch()
        
        .then(function resolve(result)
        {
            if(result == null) return Promise.resolve(null);
            
            return Promise.reject(new Error('username_unavailable'));
        },
        
        function reject(err)
        {
            return Promise.reject(err);
        });
    };

	User.validate_email = function(email_address)
    {
        var regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
        
        if(email_address == null) return Promise.reject(new Error('invalid_paramemters'));
        
        if(regex.test(email_address) == false) return Promise.reject(new Error('invalid_format'));
        
        return new user({mail: email_address}).fetch()
        
        .then(function resolve(result)
        {
            if(result == null) return Promise.resolve(null);
            
            return Promise.reject(new Error('email_unavailable'));
        },
        
        function reject(err)
        {
            return Promise.reject(err);
        });
    };

	User.user_id = function(user_name)
    {
        if(user_name == null) return false;

        return new user({username: user_name}).fetch({columns: ['id']})

        .then(function resolve(result)
        {
            if(result == null) return false;

            return result.toJSON().id;
        },

        function reject(err)
        {
            return false;
        });
    };
    
    User.user_info = function(user_id)
	{
		if(user_id == null || user_id == 0) return Promise.reject(new Error('invalid_paramemters'));
        
        return new user({id: user_id})
        
        .fetch({
            withRelated: [
				'last_login',
				{'settings': function(qb) {
					qb.column('id', 'user_id', 'block_following', 'block_friendrequests', 'block_roominvites', 'old_chat', 'ignore_bots', 'ignore_pets');
				}}
			],
			columns: ['id', 'username', 'mail', 'account_created', 'account_day_of_birth', 'motto', 'look', 'rank', 'credits', 'pixels', 'points']
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

    User.update_user = function(user_id, data)
    {
        var user_id = (user_id == null || user_id == 0 || typeof user_id != 'number') ? null : user_id;

        if(user_id == null || data == null) return Promise.reject(new Error('invalid_paramemters'));
        
        return new user({id: user_id})
        
        .fetch({
            columns: ['account_day_of_birth', 'motto', 'look', 'gender', 'home_room']
        })
        
        .then(function(result)
		{
			if(result == null) return Promise.reject(new Error('invalid_user'));

            /*
            Object.keys(data).forEach(function(key)
            {
                if(HabboAPI.Config.user_settings.update_user_keys.indexOf(key) == -1) data[key] = undefined;
            });*/
            
            result.set(data);
            
            return result.save()

            .then(function resolve(result)
            {
                if(result == null) return Promise.reject(new Error('invalid_user'));

                return Promise.resolve(result.toJSON());
            },
            
            function reject(err)
            {
                return Promise.reject(err);
            });
        },

        function reject(err)
        {
            return Promise.reject(err);
        });
    };

    User.update_settings = function(user_id, data)
    {
        if(user_id == null || user_id == 0 || data == null) return Promise.reject(new Error('invalid_paramemters'));
        
        return new user_settings({user_id: user_id})
        
        .fetch({
            columns: ['block_following', 'block_friendrequests', 'block_roominvites', 'old_chat', 'ignore_bots', 'ignore_pets']
        })
        
        .then(function(result)
		{
			if(result == null) return Promise.reject(new Error('invalid_user'));

            Object.keys(data).forEach(function(key)
            {
                data[key] = (data[key] == false) ? '0' : '1';
            });
            
            console.log(data);
            
            result.set(data);
            
            return result.save()

            .then(function resolve(result)
            {
                if(result == null) return Promise.reject(new Error('invalid_user'));

                return Promise.resolve(result.toJSON());
            },
            
            function reject(err)
            {
                return Promise.reject(err);
            });
        },

        function reject(err)
        {
            return Promise.reject(err);
        });
    };

    User.update_password = function(user_id, new_password, password)
    {
        var user_id = (user_id == null || user_id == 0 || typeof user_id != 'number') ? null : user_id;

        if(user_id == null || new_password == null || password == null) return Promise.reject(new Error('invalid_paramemters'));
        
        return new user({id: user_id})
        
        .fetch({
            columns: ['id', 'password']
        })
        
        .then(function(result)
		{
			if(result == null) return Promise.reject(new Error('invalid_user'));

            user_info = result.toJSON();

            if(bcrypt.compareSync(password, user_info.password) == false) return Promise.reject(new Error('invalid_paramemters'));

            result.set({password: bcrypt.hashSync(new_password, 10)});

            return result.save()

            .then(function resolve(result)
            {
                if(result == null) return Promise.reject(new Error('invalid_user'));

                return Promise.resolve(null);
            },
            
            function reject(err)
            {
                return Promise.reject(err);
            });
        },

        function reject(err)
        {
            return Promise.reject(err);
        });
    };

    User.update_email = function(user_id, new_email, password)
    {
        var user_id = (user_id == null || user_id == 0 || typeof user_id != 'number') ? null : user_id;

        if(user_id == null || new_email == null || password == null) return Promise.reject(new Error('invalid_paramemters'));
        
        return new user({id: user_id})
        
        .fetch({
            columns: ['id', 'password', 'mail']
        })
        
        .then(function(result)
		{
			if(result == null) return Promise.reject(new Error('invalid_user'));

            user_info = result.toJSON();

            if(bcrypt.compareSync(password, user_info.password) == false) return Promise.reject(new Error('invalid_paramemters'));

            if(new_email == user_info.mail) return Promise.reject(new Error('no_change'));

            return HabboAPI.Services.User.validate_email(new_email)

            .then(function resolve()
            {
                result.set({mail: new_email});

                return result.save()

                .then(function resolve(result)
                {
                    if(result == null) return Promise.reject(new Error('invalid_user'));

                    return Promise.resolve(null);
                },
                
                function reject(err)
                {
                    return Promise.reject(err);
                });
            },
            
            function reject(err)
            {
                return Promise.reject(err);
            });
        },

        function reject(err)
        {
            return Promise.reject(err);
        });
    };

	User.add_user = function(user_name, user_email, user_pass, user_ip)
	{
		if(user_name == null || user_email == null || user_pass == null || user_ip == null) return Promise.reject(new Error('invalid_paramemters'));
        
        return HabboAPI.Services.User.validate_username(user_name)
        
        .then(function resolve()
		{
			return HabboAPI.Services.User.validate_email(user_email)

            .then(function resolve()
            {
                return new user({
                    id: null,
				    username: user_name,
                    real_name: '',
				    password: bcrypt.hashSync(user_pass, 10),
                    mail: user_email,
                    mail_verified: '0',
                    account_created: Math.floor(Date.now() / 1000),
                    account_day_of_birth: '0',
                    last_login: Math.floor(Date.now() / 1000),
                    last_online: Math.floor(Date.now() / 1000),
                    motto: HabboAPI.Config.user_settings.new_user.motto,
                    look: HabboAPI.Config.user_settings.new_user.figure,
                    gender: HabboAPI.Config.user_settings.new_user.gender,
                    rank: HabboAPI.Config.user_settings.new_user.rank,
                    credits: HabboAPI.Config.user_settings.new_user.credits,
                    pixels: HabboAPI.Config.user_settings.new_user.pixels,
                    points: HabboAPI.Config.user_settings.new_user.points,
                    online: '0',
                    auth_ticket: '',
                    ip_register: user_ip,
                    ip_current: user_ip,
                    home_room: HabboAPI.Config.user_settings.new_user.home_room})
                
                .save(null, {method: 'insert'})

                .then(function resolve(user)
                {
                    if(user == null) return Promise.reject(new Error('invalid_user'));

                    return Promise.resolve(user.toJSON());
                },
                
                function reject(err)
                {
                    return Promise.reject(err);
                });
			},
            
            function reject(err)
            {
                return Promise.reject(err);
            });
        },

        function reject(err)
        {
            return Promise.reject(err);
		});
	};

    module.exports = User;