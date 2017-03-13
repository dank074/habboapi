
	var Middleware = require(__base + '/app/http/middleware');

	module.exports = function(app, passport)
	{
		app.get('/', function(req, res, next)
		{
			return res.render('index');
		});

		require(__base + '/app/http/services/authentication.http.service')(app, passport, Middleware);
		require(__base + '/app/http/services/session.http.service')(app, Middleware);
		require(__base + '/app/http/services/user.http.service')(app, Middleware);

		require(__base + '/app/http/controllers/community.http.controller')(app, Middleware);
		require(__base + '/app/http/controllers/group.http.controller')(app, Middleware);
		require(__base + '/app/http/controllers/room.http.controller')(app, Middleware);
		require(__base + '/app/http/controllers/profile.http.controller')(app, Middleware);
	};