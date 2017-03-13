
	var Middleware  = {};

	Middleware.is_authenticated = function(req, res, next)
	{
        if(req.user == undefined || null) return res.status(400).send({errors: true, error: 'invalid_session'}).end();
        
        return HabboAPI.Services.Session.validate_session(req.user.user_id, req.user.user_name, req.user.user_session, req.ip, req.headers['user-agent'])
        
        .then(function resolve(session)
        {
            return next();
        },
        
        function reject(err)
        {
            if(req.isAuthenticated == true) req.logout();
            
            return res.status(401).send({errors: true, error: err.message, session: null}).end();
        });
	};

	module.exports = Middleware;