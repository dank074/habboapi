import Adapter from '../../../adapter';
import HotelUserDB from '../user/user';

class HotelMessengerFriendRequestsDB extends Adapter.Model
{
	get tableName()
	{
		return 'messenger_friendrequests';
	}

	get hasTimestamps()
	{
		return false;
	}

	toUser()
	{
		return this.belongsTo('HotelUserDB', 'user_to_id');
	}

	fromUser()
	{
		return this.belongsTo('HotelUserDB', 'user_from_id');
	}
}

export default Adapter.model('HotelMessengerFriendRequestsDB', HotelMessengerFriendRequestsDB);