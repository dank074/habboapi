import Adapter from '../../adapter';
import Group from './group';
import User from '../user/user';

class GroupMembers extends Adapter.Model
{
	get tableName()
	{
		return 'guilds_members';
	}

	get hasTimestamps()
	{
		return false;
	}

	group()
	{
		return this.belongsTo('Group', 'guild_id');
	}

	user()
	{
		return this.belongsTo('User', 'user_id');
	}
}

export default Adapter.model('GroupMembers', GroupMembers);