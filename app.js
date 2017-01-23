
	global.HabboAPI 	= {};

	global.__base		= __dirname;
	global.Promise		= require('bluebird');

	HabboAPI.Config		= require(__base + '/config.json');
	HabboAPI.Adapter	= require(__base + '/app/database/adapter');
	HabboAPI.Server		= require(__base + '/app/http/server');