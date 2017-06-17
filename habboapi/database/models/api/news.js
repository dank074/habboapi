import Adapter from '../../adapter';
import HotelUser from '../hotel/user/user';
import HotelRoom from '../hotel/room/room';
import HotelGroup from '../hotel/group/group';

class ApiNews extends Adapter.Model
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
        return this.belongsTo('HotelUser', 'user_id');
    }

    room()
    {
        return this.hasOne('HotelRoom', 'id', 'room_id');
    }

    group()
    {
        return this.hasOne('HotelGroup', 'id', 'group_id');
    }

}

export default Adapter.model('ApiNews', ApiNews);