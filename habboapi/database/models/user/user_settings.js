import Adapter from '../../adapter';
import User from './user';

class UserSettings extends Adapter.Model
{
	get tableName()
	{
		return 'users_settings';
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

export default Adapter.model('UserSettings', UserSettings);