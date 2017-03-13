module.exports = function(app, Middleware)
{
	app.get('/api/service/session/get_session', Middleware.is_authenticated, function(req, res, next)
	{
		return res.status(200).send({errors: false, error: null, session: req.user}).end();
	});

	app.get('/api/service/session/destroy_session', Middleware.is_authenticated, function(req, res, next)
	{
		if(HabboAPI.Services.Session.destroy_session(req.user.user_id) == false) return res.status(401).send({errors: true, error: 'invalid_session', session: req.user}).end();
		
		req.logout();
		return res.status(200).send({errors: false, error: null, session: null}).end();
	});
};