import Adapter from '../../../adapter';
import HotelGroupDB from './group';
import HotelUserDB from '../user/user';

class HotelGroupForumDB extends Adapter.Model
{
	get tableName()
	{
		return 'guilds_forums';
	}

	get hasTimestamps()
	{
		return false;
	}

	group()
	{
		return this.belongsTo('HotelGroupDB', 'guild_id');
	}

	owner()
	{
		return this.belongsTo('HotelUserDB', 'user_id');
	}
}

export default Adapter.model('HotelGroupForumDB', HotelGroupForumDB);