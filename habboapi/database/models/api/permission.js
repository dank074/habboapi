import Adapter from '../../adapter';
import User from '../user/user';

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
        return this.hasMany('User', 'rank', 'rank_id');
    }
}

export default Adapter.model('ApiPermission', ApiPermission);