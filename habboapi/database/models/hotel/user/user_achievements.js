import Adapter from '../../../adapter';
import HotelUser from './user';

class HotelUserAchievements extends Adapter.Model
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
		return this.belongsTo('HotelUser', 'user_id');
	}
}

export default Adapter.model('HotelUserAchievements', HotelUserAchievements);