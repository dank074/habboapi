import Adapter from '../../../adapter';
import HotelUser from '../user/user';
import HotelGroupForum from './group_forum';
import HotelGroupMembers from './group_members';
import HotelRoom from '../room/room';

class HotelGroup extends Adapter.Model
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
		return this.belongsTo('HotelUser', 'user_id');
	}

	members()
	{
		return this.hasMany('HotelGroupMembers', 'guild_id', 'id');
	}

	members_count()
	{
		return this.members.count();
	}

	room()
	{
		return this.hasOne('HotelRoom', 'id', 'room_id');
	}

	forums()
	{
		return this.hasMany('HotelGroupForum', 'guild_id', 'id')
	}
}

export default Adapter.model('HotelGroup', HotelGroup);