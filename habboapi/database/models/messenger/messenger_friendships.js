import Adapter from '../../adapter';
import User from '../user/user';

class MessengerFriendships extends Adapter.Model
{
	get tableName()
	{
		return 'messenger_friendships';
	}

	get hasTimestamps()
	{
		return false;
	}

	user()
	{
		return this.belongsTo('User', 'user_two_id');
	}
}

export default Adapter.model('MessengerFriendships', MessengerFriendships);