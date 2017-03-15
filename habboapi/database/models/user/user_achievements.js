import Adapter from '../../adapter';
import User from './user';

class UserAchievements extends Adapter.Model
{
	get tableName()
	{
		return 'users_achievements';
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

export default UserAchievements;