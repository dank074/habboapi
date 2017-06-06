import Adapter from '../../../adapter';
import HotelRoom from './room';

class HotelRoomPromotion extends Adapter.Model
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
		return this.belongsTo('HotelRoom', 'room_id');
	}
}

export default Adapter.model('HotelRoomPromotion', HotelRoomPromotion);