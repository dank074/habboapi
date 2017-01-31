
	var api_loginlog    = require(__base + '/app/database/models/authentication/api_loginlog').model;

    exports.collection = HabboAPI.Adapter.Collection.extend({
		model: api_loginlog
	});