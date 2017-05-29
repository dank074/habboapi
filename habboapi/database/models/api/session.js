import Adapter from '../../adapter';
import User from '../user/user';

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
        return this.belongsTo('User', 'user_id');
    }
}

export default Adapter.model('ApiSession', ApiSession);