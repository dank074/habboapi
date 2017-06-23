import Adapter from '../../../adapter';
import HotelUserDB from './user';

class HotelUserSettingsDB extends Adapter.Model
{
	get tableName()
	{
		return 'users_settings';
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

export default Adapter.model('HotelUserSettingsDB', HotelUserSettingsDB);