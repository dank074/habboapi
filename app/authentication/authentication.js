
	var Authentication	= {},
        bcrypt          = require('bcrypt'),
        Session         = require(__base + '/app/authentication/session'),
        hotel_user      = require(__base + '/app/database/models/user/hotel_user').model;

    Authentication.login = function(req, user_name, user_pass)
    {
        return new Promise(function(resolve, reject)
        {
            if(req == null || user_name == null || user_pass == null) return reject(new Error('invalid_parameters'));

            new hotel_user({username: user_name}).fetch({columns: ['id', 'username', 'password']})

            .then(function(result)
            {
                if(result == null) return reject(new Error('invalid_login'));

                return result.toJSON();
            })

            .then(function(user)
            {
                if(bcrypt.compareSync(user_pass, user.password) == false) return reject(new Error('invalid_login'));

                return Session.create_session(req, user.id, user.username);
            })

            .then(function(session)
            {
                if(session == null) return reject(new Error('invalid_session'));

                return resolve(session);
            })

            .catch(function(err)
            {
                return reject(err);
            });
        });
    };

	module.exports = Authentication;