import Adapter from '../../adapter';
import User from '../user/user';

class Permission extends Adapter.Model
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
		return this.hasMany('User', 'rank', 'id');
	}
}

export default Adapter.model('Permission', Permission);