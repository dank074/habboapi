import Adapter from '../../../adapter';
import HotelRoomDB from './room';

class HotelRoomPromotionDB extends Adapter.Model
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
		return this.belongsTo('HotelRoomDB', 'room_id');
	}
}

export default Adapter.model('HotelRoomPromotionDB', HotelRoomPromotionDB);