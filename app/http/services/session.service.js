
	var SessionService  = {},
		Session         = require(__base + '/app/authentication/session');
	
	SessionService.get_session = function(req, res, next)
	{
		return res.status(200).send({errors: false, error: null, session: req.user}).end();
	};
	
	SessionService.destroy_session = function(req, res, next)
	{
		var user_session = (req.user.user_session == undefined || null) ? null : req.user.user_session;

		if(user_session == null || Session.destroy_session(user_session) == false) return res.status(401).send({errors: true, error: 'invalid_session', session: req.user}).end();

		req.logout();
		return res.status(200).send({errors: false, error: null, session: null}).end();
	};

	module.exports	= function(app, passport, Middleware)
	{
		app.get('/service/session/get_session', Middleware.is_authenticated, SessionService.get_session);
		app.get('/service/session/destroy_session', Middleware.is_authenticated, SessionService.destroy_session);
	};