import Adapter from '../../../adapter';
import HotelUser from './user';

class HotelUserBadges extends Adapter.Model
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
		return this.belongsTo('HotelUser', 'user_id');
	}
}

export default Adapter.model('HotelUserBadges', HotelUserBadges);