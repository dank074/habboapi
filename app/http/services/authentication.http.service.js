module.exports = function(app, passport, Middleware)
{
	app.post('/api/service/authentication/login', passport.authenticate('login'), function(req, res, next)
	{
		return res.status(200).send({errors: false, error: null, session: req.user}).end();
	});
};