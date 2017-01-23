
	var api_session    = require(__base + '/app/database/models/authentication/api_session').model;

    exports.collection = HabboAPI.Adapter.Collection.extend({
		model: api_session
	});