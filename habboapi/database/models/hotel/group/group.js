import Adapter from '../../../adapter';
import HotelUserDB from '../user/user';
import HotelGroupForumDB from './group_forum';
import HotelGroupMembersDB from './group_members';
import HotelRoomDB from '../room/room';

class HotelGroupDB extends Adapter.Model
{
	get tableName()
	{
		return 'guilds';
	}

	get hasTimestamps()
	{
		return false;
	}

	owner()
	{
		return this.belongsTo('HotelUserDB', 'user_id');
	}

	members()
	{
		return this.hasMany('HotelGroupMembersDB', 'guild_id', 'id');
	}

	members_count()
	{
		return this.members.count();
	}

	room()
	{
		return this.hasOne('HotelRoomDB', 'id', 'room_id');
	}

	forums()
	{
		return this.hasMany('HotelGroupForumDB', 'guild_id', 'id')
	}
}

export default Adapter.model('HotelGroupDB', HotelGroupDB);