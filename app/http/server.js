
    var express			= require('express'),
        app         	= express(),
		server 			= require('http').Server(app);
		passport		= require('passport'),
		cookieParser	= require('cookie-parser'),
		bodyParser		= require('body-parser'),
		session			= require('express-session');
    
    app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.set('views', __base + '/public/app/views');
	app.use(express.static(__base + '/public'));
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(session(HabboAPI.Config.session));

	require(__base + '/app/http/passport')(app, passport);
	require(__base + '/app/http/routes')(app, passport);

	server.listen(HabboAPI.Config.port, function()
	{
		console.log('HabboAPI Initialized! Listening on port: ' + HabboAPI.Config.port);
	});

    module.exports = app;