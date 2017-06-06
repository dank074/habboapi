import Adapter from '../../adapter';
import HotelUser from '../hotel/user/user';

class ApiPermission extends Adapter.Model
{
    get tableName()
    {
        return 'api_permissions';
    }

    get hasTimestamps()
    {
        return false;
    }

    users()
    {
        return this.hasMany('HotelUser', 'rank', 'rank_id');
    }
}

export default Adapter.model('ApiPermission', ApiPermission);