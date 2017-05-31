import Adapter from '../../adapter';
import User from '../user/user';
import GroupForum from './group_forum';
import GroupMembers from './group_members';
import Room from '../room/room';

class Group extends Adapter.Model
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
		return this.belongsTo('User', 'user_id');
	}

	members()
	{
		return this.hasMany('GroupMembers', 'guild_id', 'id');
	}

	room()
	{
		return this.hasOne('Room', 'id', 'room_id');
	}

	forums()
	{
		return this.hasMany('GroupForum', 'guild_id', 'id')
	}
}

export default Adapter.model('Group', Group);