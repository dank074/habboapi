import Adapter from '../../../adapter';
import HotelUserDB from '../user/user';
import HotelGroupDB from '../group/group';

class HotelRoomDB extends Adapter.Model
{
	get tableName()
	{
		return 'rooms';
	}

	get hasTimestamps()
	{
		return false;
	}

	owner()
	{
		return this.belongsTo('HotelUserDB', 'owner_id');
	}

	group()
	{
		return this.belongsTo('HotelGroupDB', 'guild_id');
	}
}

export default Adapter.model('HotelRoomDB', HotelRoomDB);