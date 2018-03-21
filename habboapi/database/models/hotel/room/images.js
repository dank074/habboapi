import Adapter from '../../../adapter';
import HotelRoomDB from './room';
import HotelUserDB from '../user/user';

class HotelRoomImagesDB extends Adapter.Model
{
	get tableName()
	{
		return 'camera_web';
	}

	get hasTimestamps()
	{
		return false;
	}

	room()
	{
		return this.belongsTo('HotelRoomDB', 'room_id');
	}
	
	user()
	{
		return this.belongsTo('HotelUserDB', 'user_id');
	}
}

export default Adapter.model('HotelRoomImagesDB', HotelRoomImagesDB);