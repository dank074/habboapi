import Adapter from '../../../adapter';
import HotelUserDB from './user';

class HotelUserBadgesDB extends Adapter.Model
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
		return this.belongsTo('HotelUserDB', 'user_id');
	}
}

export default Adapter.model('HotelUserBadgesDB', HotelUserBadgesDB);