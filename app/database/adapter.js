
	var knex		= require('knex')(HabboAPI.Config.database),
		bookshelf	= require('bookshelf')(knex);
		
	module.exports = bookshelf;