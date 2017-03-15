import Adapter from '../../adapter';
import User from '../user/user';

class LoginLog extends Adapter.Model
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

export default Adapter.model('LoginLog', LoginLog);