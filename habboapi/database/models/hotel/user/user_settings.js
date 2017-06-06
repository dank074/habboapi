import Adapter from '../../../adapter';
import HotelUser from './user';

class HotelUserSettings extends Adapter.Model
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
		return this.belongsTo('HotelUser', 'user_id');
	}
}

export default Adapter.model('HotelUserSettings', HotelUserSettings);