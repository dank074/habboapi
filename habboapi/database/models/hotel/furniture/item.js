import Adapter from '../../../adapter';
import HotelUser from '../user/user';
import HotelRoom from '../room/room';
import HotelItemBase from './item_base';

class HotelItem extends Adapter.Model
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
		return this.belongsTo('HotelUser', 'user_id');
	}

	room()
	{
		return this.belongsTo('HotelRoom', 'room_id');
	}

	item_base()
	{
		return this.hasOne('HotelItemBase', 'id', 'item_id');
	}
}

export default Adapter.model('HotelItem', HotelItem);