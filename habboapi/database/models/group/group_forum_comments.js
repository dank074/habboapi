import Adapter from '../../adapter';
import Group from './group';
import GroupForum from './group_forums';
import User from '../user/user';

class GroupForumComment extends Adapter.Model
{
	get tableName()
	{
		return 'guilds_forums_comments';
	}

	get hasTimestamps()
	{
		return false;
	}

	forum()
	{
		return this.belongsTo('GroupForum', 'thread_id');
	}

	user()
	{
		return this.belongsTo('User', 'user_id');
	}
}

export default Adapter.model('GroupForumComment', GroupForumComment);