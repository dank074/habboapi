import Adapter from '../../../adapter';
import HotelGroupDB from './group';
import HotelUserDB from '../user/user';

class HotelGroupMembersDB extends Adapter.Model
{
	get tableName()
	{
		return 'guilds_members';
	}

	get hasTimestamps()
	{
		return false;
	}

	group()
	{
		return this.belongsTo('HotelGroupDB', 'guild_id');
	}

	user()
	{
		return this.belongsTo('HotelUserDB', 'user_id');
	}
}

export default Adapter.model('HotelGroupMembersDB', HotelGroupMembersDB);