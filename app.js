
	global.HabboAPI 	= {};

	global.__base	= __dirname;
	global.Promise	= require('bluebird');

	HabboAPI.Config		= require(__base + '/config.json');
	HabboAPI.Adapter	= require(__base + '/app/database/adapter');
	HabboAPI.Server		= require(__base + '/app/http/server');

	HabboAPI.Services					= {};
	HabboAPI.Services.Authentication	= require(__base + '/app/services/authentication.service');
	HabboAPI.Services.rCRON				= require(__base + '/app/services/rcron.service');
	HabboAPI.Services.Session			= require(__base + '/app/services/session.service');
	HabboAPI.Services.User				= require(__base + '/app/services/user.service');

	HabboAPI.Controllers			= {};
	HabboAPI.Controllers.Community	= require(__base + '/app/controllers/community.controller');
	HabboAPI.Controllers.Group		= require(__base + '/app/controllers/group.controller');
	HabboAPI.Controllers.Profile	= require(__base + '/app/controllers/profile.controller');
	HabboAPI.Controllers.Room		= require(__base + '/app/controllers/room.controller');