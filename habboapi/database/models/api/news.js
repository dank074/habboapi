import Adapter from '../../adapter';
import HotelUserDB from '../hotel/user/user';
import HotelRoomDB from '../hotel/room/room';
import HotelGroupDB from '../hotel/group/group';

class ApiNewsDB extends Adapter.Model
{
    get tableName()
    {
        return 'api_news';
    }

    get hasTimestamps()
    {
        return true;
    }

    author()
    {
        return this.belongsTo('HotelUserDB', 'user_id');
    }

    room()
    {
        return this.hasOne('HotelRoomDB', 'id', 'room_id');
    }

    group()
    {
        return this.hasOne('HotelGroupDB', 'id', 'group_id');
    }

}

export default Adapter.model('ApiNewsDB', ApiNewsDB);