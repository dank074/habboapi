import Adapter from '../../../adapter';
import HotelUserDB from './user';

class HotelUserAchievementsDB extends Adapter.Model
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
		return this.belongsTo('HotelUserDB', 'user_id');
	}
}

export default Adapter.model('HotelUserAchievementsDB', HotelUserAchievementsDB);