
	var Middleware  = {},
        Session     = require(__base + '/app/authentication/session');

	Middleware.is_authenticated = function(req, res, next)
	{
        if(req.user == undefined || null) return res.status(400).send({errors: true, error: 'invalid_session', session: null}).end();
        
        var user_id         = (req.user.user_id == undefined || null || typeof req.user.user_id != 'number') ? null : req.user.user_id,
            user_name       = (req.user.user_name == undefined || null) ? null : req.user.user_name,
            user_session    = (req.user.user_session == undefined || null) ? null : req.user.user_session;
            
        if(user_id == null || user_name == null || user_session == null) return res.status(401).send({errors: true, error: 'invalid_session', session: null}).end();

        Session.validate_session(req, user_id, user_name, user_session)
        
        .then(function(session)
        {
            next();
            return null;
        })

        .catch(function(err)
        {
            if(req.isAuthenticated == true) req.logout();

            return res.status(401).send({errors: true, error: err.message, session: null}).end();
        });
	};

	module.exports = Middleware;