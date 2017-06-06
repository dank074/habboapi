import Adapter from '../../../adapter';
import HotelGroup from './group';
import HotelUser from '../user/user';

class HotelGroupForum extends Adapter.Model
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
		return this.belongsTo('HotelGroup', 'guild_id');
	}

	owner()
	{
		return this.belongsTo('HotelUser', 'user_id');
	}
}

export default Adapter.model('HotelGroupForum', HotelGroupForum);