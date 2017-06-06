import Adapter from '../../adapter';
import HotelUser from '../hotel/user/user';

class ApiLoginLog extends Adapter.Model
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
        return this.belongsTo('HotelUser', 'user_id');
    }
}

export default Adapter.model('ApiLoginLog', ApiLoginLog);