import Adapter from '../../../adapter';
import HotelGroupDB from './group';
import HotelGroupForumDB from './group_forums';
import HotelUserDB from '../user/user';

class HotelGroupForumCommentDB extends Adapter.Model
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
		return this.belongsTo('HotelGroupForumDB', 'thread_id');
	}

	user()
	{
		return this.belongsTo('HotelUserDB', 'user_id');
	}
}

export default Adapter.model('HotelGroupForumCommentDB', HotelGroupForumCommentDB);