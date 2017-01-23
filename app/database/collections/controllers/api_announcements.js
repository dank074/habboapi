
	var api_announcement    = require(__base + '/app/database/models/controllers/api_announcement').model;

    exports.collection = HabboAPI.Adapter.Collection.extend({
		model: api_announcement
	});