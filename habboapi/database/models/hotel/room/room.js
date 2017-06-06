import Adapter from '../../../adapter';
import HotelUser from '../user/user';
import HotelGroup from '../group/group';

class HotelRoom extends Adapter.Model
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
		return this.belongsTo('HotelUser', 'owner_id');
	}

	group()
	{
		return this.belongsTo('HotelGroup', 'guild_id');
	}
}

export default Adapter.model('HotelRoom', HotelRoom);