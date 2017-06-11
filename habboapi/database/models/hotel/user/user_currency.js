import Adapter from '../../../adapter';
import HotelUser from './user';

class HotelUserCurrency extends Adapter.Model
{
	get tableName()
	{
		return 'users_currency';
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

export default Adapter.model('HotelUserCurrency', HotelUserCurrency);