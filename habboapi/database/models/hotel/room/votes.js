import Adapter from '../../../adapter';
import HotelRoomDB from './room';
import HotelUserDB from '../user/user';

class HotelRoomVoteDB extends Adapter.Model
{
	get tableName()
	{
		return 'room_votes';
	}

	get hasTimestamps()
	{
		return false;
	}

	room()
	{
		return this.belongsTo('HotelRoomDB', 'room_id', 'id');
	}

    user()
    {
        return this.belongsTo('HotelUserDB', 'user_id', 'id');
    }
}

export default Adapter.model('HotelRoomVoteDB', HotelRoomVoteDB);