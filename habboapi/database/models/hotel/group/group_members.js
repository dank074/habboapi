import Adapter from '../../../adapter';
import HotelGroup from './group';
import HotelUser from '../user/user';

class HotelGroupMembers extends Adapter.Model
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
		return this.belongsTo('HotelGroup', 'guild_id');
	}

	user()
	{
		return this.belongsTo('HotelUser', 'user_id');
	}
}

export default Adapter.model('HotelGroupMembers', HotelGroupMembers);