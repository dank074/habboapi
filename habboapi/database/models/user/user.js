import Adapter from '../../adapter';
import UserAchievements from './user_achievements';
import UserBadges from './user_badges';
import UserClothing from './user_clothing';
import UserPets from './user_pets';
import UserSettings from './user_settings';
import Friends from '../messenger/messenger_friendships';
import Room from '../room/room';
import Group from '../group/group';
import GroupMemberships from '../group/group_members';
import ApiLoginLog from '../api/login_log';

class User extends Adapter.Model
{
	get tableName()
	{
		return 'users';
	}

	get hasTimestamps()
	{
		return false;
	}

	achievements()
	{
		return this.hasMany('UserAchievements', 'user_id', 'id');
	}

	badges()
	{
		return this.hasMany('UserBadges', 'user_id', 'id');
	}

	clothing()
	{
		return this.hasMany('UserClothing', 'user_id', 'id');
	}

	pets()
	{
		return this.hasMany('UserPets', 'user_id', 'id');
	}

	settings()
	{
		return this.hasOne('UserSettings', 'user_id', 'id');
	}

	friends()
	{
		return this.hasMany('MessengerFriendships', 'user_one_id', 'id');
	}

	rooms()
	{
		return this.hasMany('Room', 'owner_id', 'id');
	}

	groups()
	{
		return this.hasMany('Group', 'user_id', 'id');
	}

	group_memberships()
	{
		return this.hasMany('GroupMembers', 'user_id', 'id');
	}

	logins()
    {
        return this.hasMany('ApiLoginLog', 'user_id', 'id');
    }

    last_login()
    {
        return this.logins().query((qb) =>
        {
            qb.column('user_id', 'created_at').where('login_status', '1').orderBy('id', 'DESC').offset(1).limit(1);
        });
    }
}

export default Adapter.model('User', User);