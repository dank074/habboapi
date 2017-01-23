
	var Service					= {},
		AuthenticationService	= require(__base + '/app/services/authentication.service');
	
	Service.login = function(req, res, next)
	{
		return res.status(200).send({errors: false, error: null, session: req.user}).end();
	};
	
	Service.logout = function(req, res, next)
	{
		if(AuthenticationService.logout(req) == false) return res.status(401).send({errors: true, error: 'invalid_session', session: null}).end();

		req.logout();
		return res.status(200).send({errors: false, error: null, session: null}).end();
	};

	Service.get_session = function(req, res, next)
	{
		return res.status(200).send({errors: false, error: null, session: req.user}).end();
	};

	module.exports	= function(app, passport, Middleware)
	{
		app.post('/service/authentication/login', passport.authenticate('login'), Service.login);
		app.get('/service/authentication/logout', Service.logout);
		app.get('/service/authentication/get_session', Middleware.is_authenticated, Service.get_session);
	};