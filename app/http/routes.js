
	var glob = require('glob');

	module.exports = function(app, passport)
	{
		app.get('/', function(req, res, next)
		{
			return res.render('global', {title: 'HabboAPI'});
		});

		glob.sync(__base + '/app/http/services/*.js').forEach(function(file)
		{
			require(file)(app, passport, require(__base + '/app/http/middleware'));
		});

		glob.sync(__base + '/app/http/controllers/*.js').forEach(function(file)
		{
			require(file)(app, require(__base + '/app/http/middleware'));
		});
	};