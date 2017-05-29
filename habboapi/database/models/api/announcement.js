import Adapter from '../../adapter';
import User from '../user/user';

class ApiAnnouncement extends Adapter.Model
{
    get tableName()
    {
        return 'housekeeping_announcements';
    }

    get hasTimestamps()
    {
        return true;
    }

    owner()
    {
        return this.belongsTo('User', 'user_id');
    }
}

export default Adapter.model('ApiAnnouncement', ApiAnnouncement);