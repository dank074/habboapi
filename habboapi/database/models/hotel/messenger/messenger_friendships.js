import Adapter from '../../../adapter';
import HotelUser from '../user/user';

class HotelMessengerFriendships extends Adapter.Model
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
		return this.belongsTo('HotelUser', 'user_two_id');
	}
}

export default Adapter.model('HotelMessengerFriendships', HotelMessengerFriendships);