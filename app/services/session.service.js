
	var Session     = {},
        session     = require(__base + '/app/database/models/api/session');

    Session.create_session = function(user_id, user_name, user_ip, user_agent)
    {
        var user_id = (user_id == null || user_id == 0 || typeof user_id != 'number') ? null : user_id;
        
        if(user_id == null || user_name == null || user_ip == null || user_agent == null) return Promise.reject(new Error('invalid_parameters'));

        return HabboAPI.Services.Session.destroy_session(user_id)

        .then(function resolve()
        {
            return new session({
                id: null,
				user_id: user_id,
				user_name: user_name,
				user_session: Math.random().toString(36).substring(7),
				user_ip: user_ip,
				user_agent: user_agent})
                
            .save(null, {method: 'insert'})
            
            .then(function resolve(result)
            {
                if(result == null) return Promise.reject(new Error('invalid_session'));

                return Promise.resolve(result.toJSON());
            });
        },
        
        function reject(err)
        {
            return Promise.reject(err);
        });
    };

    Session.validate_session = function(user_id, user_name, user_session, user_ip, user_agent)
    {
        var user_id = (user_id == null || user_id == 0 || typeof user_id != 'number') ? null : user_id;
        
        if(user_id == null || user_name == null || user_session == null || user_ip == null || user_agent == null) return Promise.reject(new Error('invalid_session'));
        
        return new session({user_session: user_session})
        
        .fetch({
            columns: ['user_id', 'user_name', 'user_session', 'user_ip', 'user_agent']
        })
        
        .then(function resolve(result)
        {
            if(result == null) return Promise.reject(new Error('invalid_session'));
            
            var session = result.toJSON();
            
            if(session.user_id != user_id || session.user_name != user_name || session.user_ip != user_ip || session.user_agent != user_agent) return HabboAPI.Services.Session.destroy_session(session.user_id)
            
            .then(function(resolve)
            {
                return Promise.reject(new Error('invalid_session'));
            });

            return Promise.resolve(session);
        },

        function reject(err)
        {
            return Promise.reject(err);
        });
    };

    Session.destroy_session = function(user_id)
    {
        var user_id = (user_id == null || user_id == 0 || typeof user_id != 'number') ? null : user_id;

        if(user_id == null) return false;

        return new session({user_id: user_id})
        
        .fetchAll({
            columns: ['id']
        })
    
        .then(function resolve(result)
        {
            if(result == null) return false;

            result.forEach(function(session)
            {
                session.destroy();
            });

            return true;
        },

        function reject(err)
        {
            return false;
        });
    };

	module.exports = Session;