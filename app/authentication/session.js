
	var Session         = {},
        User			= require(__base + '/app/users/user'),
        api_session     = require(__base + '/app/database/models/authentication/api_session').model,
        api_loginlog    = require(__base + '/app/database/models/authentication/api_loginlog').model,
        api_sessions    = require(__base + '/app/database/collections/authentication/api_sessions').collection;

    Session.create_session = function(req, user_id, user_name)
    {
        return new Promise(function(resolve, reject)
        {
            if(req == null || user_id == null || typeof user_id != 'number' || user_name == null) return reject(new Error('invalid_parameters'));

            new api_sessions({user_id: user_id}).fetch({columns: ['id']})
            
            .then(function(result)
            {
                if(result != null)
                {
                    result.forEach(function(session)
                    {
                        session.destroy();
                    });
                }

                return new api_session({
                    id: null,
				    user_id: user_id,
				    user_name: user_name,
				    user_session: Math.random().toString(36).substring(7),
				    user_ip: req.ip,
				    user_agent: req.headers['user-agent']}).save(null, {method: 'insert'});
            })

            .then(function(session)
            {
                if(session == null) return reject(new Error('invalid_session'));

                return resolve(session.toJSON());
            })

            .catch(function(err)
            {
                return reject(err);
            });
        });
    };

    Session.validate_session = function(req, user_id, user_name, user_session)
    {
        return new Promise(function(resolve, reject)
        {
            if(req == null || user_id == null || typeof user_id != 'number' || user_name == null || user_session == null) return reject(new Error('invalid_session'));
            
            new api_session({user_session: user_session}).fetch({columns: ['user_id', 'user_name', 'user_session', 'user_ip', 'user_agent']})
            
            .then(function(result)
            {
                if(result == null) return reject(new Error('invalid_session'));

                var session = result.toJSON();

                if(session.user_id != user_id || session.user_name != user_name || session.user_ip != req.ip || session.user_agent != req.headers['user-agent'])
                {
                    Session.destroy_session(session.user_session);
                    return reject(new Error('invalid_session'));
                }

                return resolve(session);
            })
            
            .catch(function(err)
            {
                return reject(err);
            });
        });
    };

    Session.destroy_session = function(user_session)
    {
        if(user_session == null) return false;

        new api_session({user_session: user_session}).fetch({columns: ['id']})
    
        .then(function(result)
        {
            if(result == null) return false;
            
            result.destroy();
            return true;
        })
        
        .catch(function(err)
        {
            return false;
        });
    }

	module.exports = Session;