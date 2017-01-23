
	var Middleware 				= {},
		AuthenticationService	= require(__base + '/app/services/authentication.service');

	Middleware.is_authenticated = function(req, res, next)
	{
        AuthenticationService.validate_session(req)
        
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