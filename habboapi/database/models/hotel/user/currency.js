import Adapter from '../../../adapter';
import HotelUserDB from './user';

class HotelUserCurrencyDB extends Adapter.Model
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
		return this.belongsTo('HotelUserDB', 'user_id');
	}
}

export default Adapter.model('HotelUserCurrencyDB', HotelUserCurrencyDB);