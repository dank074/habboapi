import Adapter from '../../../adapter';
import HotelUserAchievementsDB from './user_achievements';
import HotelUserBadgesDB from './user_badges';
import HotelUserBanDB from './user_ban';
import HotelUserCurrencyDB from './user_currency';
import HotelUserSettingsDB from './user_settings';
import HotelFriendsDB from '../messenger/messenger_friendships';
import HotelRoomDB from '../room/room';
import HotelRoomEnterLogDB from '../room/room_enter_log';
import HotelGroupDB from '../group/group';
import HotelGroupMembershipsDB from '../group/group_members';
import ApiLoginLogDB from '../../api/login_log';

class HotelUserDB extends Adapter.Model
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
		return this.hasMany('HotelUserAchievementsDB', 'user_id', 'id');
	}

	badges()
	{
		return this.hasMany('HotelUserBadgesDB', 'user_id', 'id');
	}

	bans()
	{
		return this.hasMany('HotelUserBanDB', 'user_id', 'id');
	}

	currency()
	{
		return this.hasMany('HotelUserCurrencyDB', 'user_id', 'id');
	}

	settings()
	{
		return this.hasOne('HotelUserSettingsDB', 'user_id', 'id');
	}

	friends()
	{
		return this.hasMany('HotelMessengerFriendshipsDB', 'user_one_id', 'id');
	}

	rooms()
	{
		return this.hasMany('HotelRoomDB', 'owner_id', 'id');
	}

	room_entries()
	{
		return this.hasMany('HotelRoomEnterLogDB', 'user_id', 'id');
	}

	groups()
	{
		return this.hasMany('HotelGroupDB', 'user_id', 'id');
	}

	group_memberships()
	{
		return this.hasMany('HotelGroupMembersDB', 'user_id', 'id');
	}

	logins()
    {
        return this.hasMany('ApiLoginLogDB', 'user_id', 'id');
    }

    last_login()
    {
        return this.logins().query((qb) =>
        {
            qb.column('user_id', 'created_at').where('login_status', '1').andWhere('login_type', 'site').orderBy('id', 'DESC').offset(1).limit(1);
        });
    }
}

export default Adapter.model('HotelUserDB', HotelUserDB);