import Adapter from '../../adapter';
import HotelUserDB from '../hotel/user/user';

class ApiSessionDB extends Adapter.Model
{
    get tableName()
    {
        return 'api_sessions';
    }

    get hasTimestamps()
    {
        return true;
    }

    user()
    {
        return this.belongsTo('HotelUserDB', 'user_id');
    }
}

export default Adapter.model('ApiSessionDB', ApiSessionDB);