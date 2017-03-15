import Adapter from '../../adapter';
import Room from './room';

class RoomPromotion extends Adapter.Model
{
	get tableName()
	{
		return 'room_promotions';
	}

	get hasTimestamps()
	{
		return false;
	}

	room()
	{
		return this.belongsTo('Room', 'room_id');
	}
}

export default Adapter.model('RoomPromotion', RoomPromotion);