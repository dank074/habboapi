import Adapter from '../../../adapter';
import HotelUserDB from '../user/user';

class HotelPermissionDB extends Adapter.Model
{
    get tableName()
    {
        return 'permissions';
    }

    get hasTimestamps()
    {
        return false;
    }

    users()
    {
        return this.hasMany('HotelUserDB', 'rank', 'id');
    }
}

export default Adapter.model('HotelPermissionDB', HotelPermissionDB);