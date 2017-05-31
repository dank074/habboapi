import Adapter from '../../adapter';
import Group from './group';
import User from '../user/user';

class GroupForum extends Adapter.Model
{
	get tableName()
	{
		return 'guilds_forums';
	}

	get hasTimestamps()
	{
		return false;
	}

	group()
	{
		return this.belongsTo('Group', 'guild_id');
	}

	owner()
	{
		return this.belongsTo('User', 'user_id');
	}
}

export default Adapter.model('GroupForum', GroupForum);