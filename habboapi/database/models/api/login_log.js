import Adapter from '../../adapter';
import HotelUserDB from '../hotel/user/user';

class ApiLoginLogDB extends Adapter.Model
{
    get tableName()
    {
        return 'api_loginlog';
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

export default Adapter.model('ApiLoginLogDB', ApiLoginLogDB);