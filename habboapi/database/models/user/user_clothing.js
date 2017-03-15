import Adapter from '../../adapter';
import User from './user';

class UserClothing extends Adapter.Model
{
	get tableName()
	{
		return 'users_clothing';
	}

	get hasTimestamps()
	{
		return false;
	}

	user()
	{
		return this.belongsTo('User', 'user_id');
	}
}

export default UserClothing;