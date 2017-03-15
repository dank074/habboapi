import Adapter from '../../adapter';
import User from './user';

class UserBadges extends Adapter.Model
{
	get tableName()
	{
		return 'users_badges';
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

export default UserBadges;