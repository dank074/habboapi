
	var hotel_user    = require(__base + '/app/database/models/user/hotel_user').model;
	
	exports.collection = HabboAPI.Adapter.Collection.extend({
		model: hotel_user
	});