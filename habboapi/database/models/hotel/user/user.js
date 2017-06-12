import Adapter from '../../../adapter';
import HotelUserAchievements from './user_achievements';
import HotelUserBadges from './user_badges';
import HotelUserBan from './user_ban';
import HotelUserCurrency from './user_currency';
import HotelUserSettings from './user_settings';
import HotelFriends from '../messenger/messenger_friendships';
import HotelRoom from '../room/room';
import HotelGroup from '../group/group';
import HotelGroupMemberships from '../group/group_members';
import ApiLoginLog from '../../api/login_log';

class HotelUser extends Adapter.Model
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
		return this.hasMany('HotelUserAchievements', 'user_id', 'id');
	}

	badges()
	{
		return this.hasMany('HotelUserBadges', 'user_id', 'id');
	}

	bans()
	{
		return this.hasMany('HotelUserBan', 'user_id', 'id');
	}

	currency()
	{
		return this.hasMany('HotelUserCurrency', 'user_id', 'id');
	}

	settings()
	{
		return this.hasOne('HotelUserSettings', 'user_id', 'id');
	}

	friends()
	{
		return this.hasMany('HotelMessengerFriendships', 'user_one_id', 'id');
	}

	rooms()
	{
		return this.hasMany('HotelRoom', 'owner_id', 'id');
	}

	groups()
	{
		return this.hasMany('HotelGroup', 'user_id', 'id');
	}

	group_memberships()
	{
		return this.hasMany('HotelGroupMembers', 'user_id', 'id');
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

export default Adapter.model('HotelUser', HotelUser);