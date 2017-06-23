import Adapter from '../../../adapter';
import HotelUserDB from './user';

class HotelUserBanDB extends Adapter.Model
{
	get tableName()
	{
		return 'bans';
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

export default Adapter.model('HotelUserBanDB', HotelUserBanDB);