import Adapter from '../../adapter';
import User from '../user/user';

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
        return this.belongsTo('User', 'user_id');
    }
}

export default Adapter.model('ApiLoginLog', ApiLoginLog);