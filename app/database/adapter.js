var knex		= require('knex'),
	bookshelf	= require('bookshelf');

const ORM = bookshelf(knex(HabboAPI.Config.database));

ORM.plugin('registry');
ORM.plugin('pagination');
		
module.exports = ORM;