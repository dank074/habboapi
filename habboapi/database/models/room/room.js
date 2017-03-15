import Adapter from '../../adapter';
import User from '../user/user';
import Group from '../group/group';

class Room extends Adapter.Model
{
	get tableName()
	{
		return 'rooms';
	}

	get hasTimestamps()
	{
		return false;
	}

	owner()
	{
		return this.belongsTo('User', 'owner_id');
	}

	group()
	{
		return this.belongsTo('Group', 'guild_id');
	}
}

export default Adapter.model('Room', Room);