import Adapter from '../../../adapter';
import HotelGroup from './group';
import HotelGroupForum from './group_forums';
import HotelUser from '../user/user';

class HotelGroupForumComment extends Adapter.Model
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
		return this.belongsTo('HotelGroupForum', 'thread_id');
	}

	user()
	{
		return this.belongsTo('HotelUser', 'user_id');
	}
}

export default Adapter.model('HotelGroupForumComment', HotelGroupForumComment);