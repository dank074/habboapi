import Adapter from '../../adapter';
import User from '../user/user';
import Room from '../room/room';
import ItemBase from './item_base';

class Item extends Adapter.Model
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
		return this.belongsTo('User', 'user_id');
	}

	room()
	{
		return this.belongsTo('Room', 'room_id');
	}

	item_base()
	{
		return this.hasOne('ItemBase', 'id', 'item_id');
	}
}

export default Adapter.model('Item', Item);