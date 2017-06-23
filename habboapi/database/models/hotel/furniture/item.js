import Adapter from '../../../adapter';
import HotelUserDB from '../user/user';
import HotelRoomDB from '../room/room';
import HotelItemBaseDB from './item_base';

class HotelItemDB extends Adapter.Model
{
	get tableName()
	{
		return 'items';
	}

	get hasTimestamps()
	{
		return false;
	}

	owner()
	{
		return this.belongsTo('HotelUserDB', 'user_id');
	}

	room()
	{
		return this.belongsTo('HotelRoomDB', 'room_id');
	}

	item_base()
	{
		return this.hasOne('HotelItemBaseDB', 'id', 'item_id');
	}
}

export default Adapter.model('HotelItemDB', HotelItemDB);