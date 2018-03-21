import Adapter from '../../../adapter';
import HotelUserDB from '../user/user';

class HotelMessengerFriendshipsDB extends Adapter.Model
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
		return this.belongsTo('HotelUserDB', 'user_one_id');
	}

	friend()
	{
		return this.belongsTo('HotelUserDB', 'user_two_id');
	}
}

export default Adapter.model('HotelMessengerFriendshipsDB', HotelMessengerFriendshipsDB);