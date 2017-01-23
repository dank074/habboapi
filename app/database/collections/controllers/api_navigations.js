
	var api_navigation    = require(__base + '/app/database/models/controllers/api_navigation').model;

    exports.collection = HabboAPI.Adapter.Collection.extend({
		model: api_navigation
	});