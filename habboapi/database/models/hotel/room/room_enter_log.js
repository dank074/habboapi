import Adapter from '../../../adapter';
import HotelRoom from './room';
import HotelUser from '../user/user';

class HotelRoomEnterLog extends Adapter.Model
{
	get tableName()
	{
		return 'room_enter_log';
	}

	get hasTimestamps()
	{
		return false;
	}

	room()
	{
		return this.belongsTo('HotelRoom', 'room_id');
	}

    user()
    {
        return this.belongsTo('HotelUser', 'user_id');
    }
}

export default Adapter.model('HotelRoomEnterLog', HotelRoomEnterLog);