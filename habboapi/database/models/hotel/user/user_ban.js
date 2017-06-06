import Adapter from '../../../adapter';
import HotelUser from './user';

class HotelUserBan extends Adapter.Model
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
		return this.belongsTo('HotelUser', 'user_id');
	}
}

export default Adapter.model('HotelUserBan', HotelUserBan);