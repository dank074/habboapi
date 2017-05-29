import Adapter from '../../adapter';
import User from './user';

class UserBan extends Adapter.Model
{
	get tableName()
	{
		return 'bans';
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

export default Adapter.model('UserBan', UserBan);