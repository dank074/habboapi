
	var Authentication  = {},
        bcrypt          = require('bcrypt'),
        user			= require(__base + '/app/database/models/user/user'),
        login_log	    = require(__base + '/app/database/models/api/login_log');

    Authentication.login = function(user_name, user_pass, user_ip, user_agent)
    {
        if(user_name == null || user_pass == null || user_ip == null || user_agent == null) return Promise.reject(new Error('invalid_parameters'));
        
        return new user({username: user_name})
        
        .fetch({
            columns: ['id', 'username', 'password', 'auth_ticket', 'ip_current']
        })
        
        .then(function resolve(result)
        {
            if(result == null) return HabboAPI.Services.Authentication.log_login(0, user_name, user_ip, user_agent, false)
            
            .then(function resolve(result)
            {
                return Promise.reject(new Error('invalid_login'));
            });

            user_info = result.toJSON();

            if(bcrypt.compareSync(user_pass, user_info.password) == false) return HabboAPI.Services.Authentication.log_login(user_info.id, user_info.username, user_ip, user_agent, false)
            
            .then(function resolve(result)
            {
                return Promise.reject(new Error('invalid_login'));
            });
            
            return HabboAPI.Services.Session.create_session(user_info.id, user_info.username, user_ip, user_agent)

            .then(function resolve(session)
            {
                if(session == null) return Promise.reject(new Error('invalid_session'));

                result.set({auth_ticket: session.user_session, ip_current: user_ip})

                return result.save()

                .then(function resolve()
                {
                    return HabboAPI.Services.Authentication.log_login(user_info.id, user_info.username, user_ip, user_agent, true)
                    
                    .then(function resolve(result)
                    {
                        return Promise.resolve(session);
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
        },
        
        function reject(err)
        {
            return Promise.reject(err);
        });
    };

    Authentication.log_login = function(user_id, user_name, user_ip, user_agent, login_status)
    {
        var user_id         = (user_id == null || typeof user_id != 'number') ? '0' : user_id,
            login_status    = (login_status == true) ? '1' : '0';
        
        if(user_id == null || user_name == null || user_ip == null || user_agent == null || login_status == null) return Promise.reject(new Error('invalid_parameters'));
        
        return new login_log({
            id: null,
            user_id: user_id,
            user_name: user_name,
            user_ip: user_ip,
            user_agent: user_agent,
            login_status: login_status})
        
        .save(null, {method: 'insert'})
            
        .then(function resolve(result)
        {
            if(result == null) return Promise.reject(new Error('log_error'));
            
            return Promise.resolve(null);
        },
        
        function reject(err)
        {
            return Promise.reject(err);
        });
    };

	module.exports = Authentication;