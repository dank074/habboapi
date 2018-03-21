import bcrypt from 'bcrypt';
import Adapter from '../../../adapter';
import HotelUserBadgesDB from './badges';
import HotelUserCurrencyDB from './currency';
import HotelUserFavoriteRoomsDB from './favoriteRooms';
import HotelUserSettingsDB from './settings';
import HotelBanDB from '../ban/ban';
import HotelGroupDB from '../group/group';
import HotelGroupMembershipsDB from '../group/members';
import HotelMessengerFriendRequestsDB from '../messenger/friendRequests';
import HotelMessengerFriendshipsDB from '../messenger/friendships';
import HotelRoomDB from '../room/room';
import HotelRoomEntriesDB from '../room/enterLog';
import HotelRoomImagesDB from '../room/images';
import HotelRoomVotesDB from '../room/votes';

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

	badges()
	{
		return this.hasMany('HotelUserBadgesDB', 'user_id');
	}

	currency()
	{
		return this.hasMany('HotelUserCurrencyDB', 'user_id');
	}

	favoriteRooms()
    {
        return this.hasMany('HotelUserFavoriteRoomsDB', 'user_id');
    }

	settings()
	{
		return this.hasOne('HotelUserSettingsDB', 'user_id');
	}

	bans()
	{
		return this.hasMany('HotelBanDB', 'user_id');
	}

	groups()
	{
		return this.hasMany('HotelGroupDB', 'user_id');
	}

	groupMemberships()
	{
		return this.hasMany('HotelGroupMembersDB', 'user_id');
	}

	friendRequests()
	{
		return this.hasMany('HotelMessengerFriendRequestsDB', 'user_to_id');
	}

	friendRequestsSent()
	{
		return this.hasMany('HotelMessengerFriendRequestsDB', 'user_from_id');
	}

	friends()
	{
		return this.hasMany('HotelMessengerFriendshipsDB', 'user_one_id');
	}

	rooms()
	{
		return this.hasMany('HotelRoomDB', 'owner_id');
	}

	roomEntries()
	{
		return this.hasMany('HotelRoomEnterLogDB', 'user_id');
	}

	roomImages()
	{
		return this.hasMany('HotelRoomImagesDB', 'user_id');
	}

	roomVotes()
	{
		return this.hasMany('HotelRoomVotesDB', 'user_id');
	}

	static userLogin(username = null, password = null)
	{
		return new Promise((resolve, reject) =>
		{
			if(username == null || password == null) return reject(new Error('invalid_parameters'));

			return HotelUserDB.where('username', username).fetch({
                columns: ['id', 'username', 'password']
			})
			
			.then((result) =>
			{
				if(result == null) return reject(new Error('invalid_login'));

				result = result.toJSON();

				if(bcrypt.compareSync(password, result.password) == false) return reject(new Error('invalid_login'));

				return resolve({id: result.id, username: result.username});
			})

			.catch((err) =>
			{
				return reject(err);
			});
		});
	}

	static loadUserInfo(id = 0, username = null)
	{
		return new Promise((resolve, reject) =>
        {
            if(id == 0 || null && username == null) return reject(new Error('invalid_parameters'));

            return HotelUserDB.query((qb) => {
                if(id == 0 || null && username != null) qb.where('username', username);
                else if(id != 0 || null && username == null) qb.where('id', id);
                else return reject(new Error('invalid_parameters'));
            }).fetch({
                withRelated: [
					'currency',
					'friendRequests',
					{'friendRequests.fromUser': (qb) => {
						qb.column('id', 'username', 'last_online', 'motto', 'look', 'online');
					}},
					'friendRequestsSent',
					{'friendRequestsSent.toUser': (qb) => {
						qb.column('id', 'username', 'last_online', 'motto', 'look', 'online');
					}},
					{'friends': (qb) => {
						qb.column('id', 'user_one_id', 'user_two_id', 'friends_since');
					}},
					{'friends.friend': (qb) => {
						qb.column('id', 'username', 'last_online', 'motto', 'look', 'online');
					}},
                    {'settings': (qb) => {
                        qb.column('id', 'user_id', 'block_following', 'block_friendrequests', 'block_roominvites', 'old_chat', 'ignore_bots', 'ignore_pets');
                    }}
                ],
				columns: ['id', 'username', 'mail', 'account_created', 'last_online', 'motto', 'look', 'rank', 'credits', 'online', 'ip_register', 'ip_current', 'auth_ticket']
            })

            .then((result) =>
            {
				if(result == null) return reject(new Error('invalid_user'));
				
				result = result.toJSON();

				let friends 			= [];
				let friendRequests		= [];
				let friendRequestsSent 	= [];
				let duckets				= 0;
				let diamonds			= 0;

				if(result.currency.length > 0)
				{
					result.currency.forEach((currency) =>
					{
						if(currency.type == '0') duckets = currency.amount;
						if(currency.type == '5') diamonds = currency.amount;
						return;
					});
				}

				if(result.friendRequests.length > 0)
				{
					result.friendRequests.forEach((request) =>
					{
						return friendRequests.push(request.fromUser);
					});
				}

				if(result.friendRequestsSent.length > 0)
				{
					result.friendRequestsSent.forEach((request) =>
					{
						return friendRequestsSent.push(request.toUser);
					});
				}

				if(result.friends.length > 0)
				{
					result.friends.forEach((friendship) =>
					{
						friendship.friend.friends_since = friendship.friends_since;
						return friends.push(friendship.friend);
					});
				}

				delete result.currency;
				delete result.friendRequests;
				delete result.friendRequestsSent;
				delete result.friends;

				result.friendRequests 		= friendRequests;
				result.friendRequestsSent	= friendRequestsSent;
				result.friends 				= friends;
				result.duckets 				= duckets;
				result.diamonds				= diamonds;

                return resolve(result);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
	}

	static loadProfileInfo(id = 0, username = null)
	{
		return new Promise((resolve, reject) =>
        {
            if(id == 0 && username == null) return reject(new Error('invalid_parameters'));
            
            return HotelUserDB.query((qb) => {
                if(id == 0 || null && username != null) qb.where('username', username);
                else if(id != 0 || null && username == null) qb.where('id', id);
                else return reject(new Error('invalid_parameters'));
            }).fetch({
                withRelated: [
                    {'badges': (qb) => {
                        qb.column('user_id', 'slot_id', 'badge_code');
					}},
                    {'friends': (qb) => {
                        qb.column('user_one_id', 'user_two_id', 'friends_since');
                    }},
                    {'friends.friend': (qb) => {
                        qb.column('id', 'username', 'last_online', 'motto', 'look', 'online');
                    }},
                    {'groupMemberships': (qb) => {
                        qb.column('id', 'user_id', 'guild_id', 'member_since');
                    }},
                    {'groupMemberships.group': (qb) => {
                        qb.column('id', 'name', 'description', 'badge');
                    }},
                    {'rooms': (qb) => {
                        qb.column('id', 'owner_id', 'name', 'description', 'score');
					}}
                ],
                columns: ['id', 'username', 'account_created', 'last_online', 'motto', 'look', 'credits', 'online']
            })

            .then((result) =>
            {
				if(result == null) return reject(new Error('invalid_user'));

				result = result.toJSON();

				let friends 	= [];
				let groups		= [];

				if(result.friends.length > 0)
				{
					result.friends.forEach((friendship) =>
					{
						friendship.friend.friends_since = friendship.friends_since;
						return friends.push(friendship.friend);
					})
				}

				if(result.groupMemberships.length > 0)
				{
					result.groupMemberships.forEach((membership) =>
					{
						membership.group.member_since = membership.member_since;
						return groups.push(membership.group);
					})
				}

				delete result.friends;
				delete result.groupMemberships;

				result.friends	= friends;
				result.groups 	= groups;

                return resolve(result);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
	}

	static updateUser(id = 0, data = null)
	{
		return new Promise((resolve, reject) =>
		{
			if(id == 0 || null || typeof data !== 'object' || data == null) return reject(new Error('invalid_parameters'));

			return HotelUserDB.where('id', id).fetch({
				columns: ['id', 'motto']
			})

			.then((result) =>
			{
				if(result == null) return reject(new Error('invalid_user'));

				let update = {
					motto: data.motto
				};

				result.save(update, {method: 'update'});

				return resolve(null);
			})

			.catch((err) =>
			{
				return reject(err);
			});
		});
	}

	static updateClient(id = 0, authTicket = null, ip = null)
	{
		return new Promise((resolve, reject) =>
		{
			if(id == 0 || null || authTicket == null || ip == null) return reject(new Error('invalid_parameters'));

			return HotelUserDB.where('id', id).fetch({
				columns: ['id', 'username', 'auth_ticket', 'ip_current']
			})

			.then((result) =>
			{
				if(result == null) return reject(new Error('invalid_user'));

				let update = {
					auth_ticket: authTicket,
					ip_current: ip
				};

				result.save(update, {method: 'update'});

				return resolve(null);
			})

			.catch((err) =>
			{
				return reject(err);
			});
		});
	}

	static updatePassword(id = 0, password = null, passwordNew = null)
	{
		return new Promise((resolve, reject) =>
		{
			if(id == 0 || null || password == null || passwordNew == null) return reject(new Error('invalid_parameters'));

			return HotelUserDB.where('id', id).fetch({
				columns: ['id', 'password']
			})

			.then((result) =>
			{
				if(result == null) return reject(new Error('invalid_user'));

				if(bcrypt.compareSync(password, result.toJSON().password) == false) return reject(new Error('invalid_password'));

				let update = {
					password: bcrypt.hashSync(passwordNew, __config.passwordSalt)
				};
				
				result.save(update, {method: 'update'});

				return resolve(null);
			})

			.catch((err) =>
			{
				return reject(err);
			});
		});
	}

	static updateEmail(id = 0, password = null, email = null)
	{
		return new Promise((resolve, reject) =>
		{
			if(id == 0 || null || password == null || email == null) return reject(new Error('invalid_parameters'));

			return HotelUserDB.where('id', id).fetch({
				columns: ['id', 'password', 'mail']
			})

			.then((result) =>
			{
				if(result == null) return reject(new Error('invalid_user'));

				if(bcrypt.compareSync(password, result.toJSON().password) == false) return reject(new Error('invalid_password'));

				let update = {
					mail: email
				};
				
				result.save(update, {method: 'update'});

				return resolve(null);
			})

			.catch((err) =>
			{
				return reject(err);
			});
		});
	}
	
	static validateUsername(username = null)
    {
        return new Promise((resolve, reject) =>
        {
            let regex = new RegExp(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{1,20}$/g);
            
			if(username == null || regex.test(username) == false) return reject(new Error('invalid_paramemters'));
			
			__config.userSettings.userProhibitedUsernames.forEach((user_name) =>
            {
                if(username.indexOf(user_name) != -1) return reject(new Error('username_unavailable'));
            });

            return HotelUserDB.where('username', username).fetch()

            .then((result) =>
            {
                if(result == null) return resolve(null);

                return reject(new Error('username_unavailable'));
            })

            .catch((err) =>
            {
                return reject(err);
            });
        })
    }

    static validateEmail(email = null)
    {
        return new Promise((resolve, reject) =>
        {
            let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g);
            
            if(email == '' || null) return reject(new Error('invalid_paramemters'));
            
            if(regex.test(email) == false) return reject(new Error('invalid_email'));

            return HotelUserDB.where('mail', email).fetch()

            .then((result) =>
            {
                if(result == null) return resolve(null);

                return reject(new Error('email_unavailable'));
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

	static loadRandomUsers()
	{
		return new Promise((resolve, reject) =>
		{
			return HotelUserDB.query((qb) => {
				qb.whereNotIn('id', __config.database.hides.randomUsersHideUser).orderByRaw('RAND()').limit(9);
			}).fetchAll({
				columns: ['id', 'username', 'last_online', 'motto', 'look', 'online']
			})

			.then((results) =>
			{
				if(results == null) return resolve(null);

				return resolve(results.toJSON());
			})

			.catch((err) =>
			{
				return reject(err);
			});
		});
	}

	static loadMostCredits()
	{
		return new Promise((resolve, reject) =>
        {
            return HotelUserDB.query((qb) => {
                qb.whereNotIn('id', __config.database.hides.mostCreditsHideUser).andWhereNot('credits', 0).orderBy('credits', 'DESC').limit(10);
            }).fetchAll({
                columns: ['id', 'username', 'motto', 'look', 'credits']
            })

            .then((results) =>
            {
                if(results == null) return resolve(null);

                return resolve(results.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
	}

	static loadLatestUser()
	{
		return new Promise((resolve, reject) =>
        {
            return HotelUserDB.query((qb) => {
                qb.orderBy('id', 'DESC').limit(1);
            }).fetch({
                columns: ['id', 'username', 'last_online', 'motto', 'look', 'online']
            })
            
            .then((results) =>
            {
                if(results == null) return resolve(null);

                return resolve(results.toJSON());
            })
            
            .catch((err) =>
            {
                return reject(err);
            });
        });
	}

	static loadTotalUsersOnline()
	{
		return new Promise((resolve, reject) =>
        {
            return HotelUserDB.where('online', '1').count()

            .then((result) =>
            {
                if(result == null) return resolve(null);

                return resolve(result);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
	}
}

export default Adapter.model('HotelUserDB', HotelUserDB);