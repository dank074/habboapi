
	var AuthenticationService	= {},
		Authentication			= require(__base + '/app/authentication/authentication');
	
	AuthenticationService.login = function(req, res, next)
	{
		return res.status(200).send({errors: false, error: null, session: req.user}).end();
	};

	module.exports	= function(app, passport, Middleware)
	{
		app.post('/service/authentication/login', passport.authenticate('login'), AuthenticationService.login);
	};