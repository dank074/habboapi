import Adapter from '../../../adapter';
import HotelUserDB from './user';
import HotelRoomDB from '../room/room';

class HotelUserFavoriteRoomDB extends Adapter.Model
{
	get tableName()
	{
		return 'users_favorite_rooms';
	}

	get hasTimestamps()
	{
		return false;
	}

	user()
	{
		return this.belongsTo('HotelUserDB', 'user_id', 'id');
    }
    
    room()
    {
        return this.belongsTo('HotelRoomDB', 'room_id', 'id');
    }
}

export default Adapter.model('HotelUserFavoriteRoomDB', HotelUserFavoriteRoomDB);