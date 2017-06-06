import Adapter from '../../adapter';
import HotelUser from '../hotel/user/user';

class ApiSession extends Adapter.Model
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
        return this.belongsTo('HotelUser', 'user_id');
    }
}

export default Adapter.model('ApiSession', ApiSession);