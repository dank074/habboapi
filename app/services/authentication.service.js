
	var AuthenticationService	= {},
        bcrypt                  = require('bcrypt'),
        hotel_user              = require(__base + '/app/database/models/user/hotel_user').model,
        api_session             = require(__base + '/app/database/models/authentication/api_session').model,
        api_sessions            = require(__base + '/app/database/collections/authentication/api_sessions').collection;

    AuthenticationService.login = function(req, user_name, user_pass)
    {
        return new Promise(function(resolve, reject)
        {
            if(req == null || user_name == null || user_pass == null) return reject(new Error('invalid_parameters'));

            new hotel_user({username: user_name}).fetch()

            .then(function(result)
            {
                if(result == null) return reject(new Error('invalid_login'));

                return result.toJSON();
            })

            .then(function(user)
            {
                if(bcrypt.compareSync(user_pass, user.password) == false) return reject(new Error('invalid_login'));

                new api_sessions({user_id: user.id}).fetch()

                .then(function(result)
                {
                    if(result != null)
                    {
                        result.forEach(function(session)
                        {
                            session.destroy();
                        });
                    }
                });

                return user;
            })

            .then(function(user)
            {
                return new api_session({
                    id: null,
				    user_id: user.id,
				    user_name: user.username,
				    user_session: Math.random().toString(36).substring(7),
				    user_ip: req.ip,
				    user_agent: req.headers['user-agent']}).save();
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

    AuthenticationService.validate_session = function(req)
    {
        return new Promise(function(resolve, reject)
        {
            if(req == null || req.user == undefined || null || req.user.user_id == undefined || null || req.user.user_name == undefined || null || req.user.user_session == undefined || null || req.isAuthenticated() == false) return reject(new Error('invalid_session'));
            
            new api_session({user_session: req.user.user_session}).fetch()
            
            .then(function(result)
            {
                if(result == null) return reject(new Error('invalid_session'));

                var session = result.toJSON();

                if(session.user_id != req.user.user_id || session.user_name != req.user.user_name || session.user_ip != req.ip || session.user_agent != req.headers['user-agent']) return reject(new Error('invalid_session'));

                return resolve(session);
            })
            
            .catch(function(err)
            {
                return reject(err);
            });
        });
    };

    AuthenticationService.logout = function(req)
    {
        if(req == null || req.user == undefined || null || req.user.user_session == undefined || null) return false;

        new api_session({user_session: req.user.user_session}).fetch()
    
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
    };

	module.exports = AuthenticationService;