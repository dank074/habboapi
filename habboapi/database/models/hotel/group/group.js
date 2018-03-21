import Adapter from '../../../adapter';
import HotelGroupMembersDB from './members';
import HotelRoomDB from '../room/room';
import HotelUserDB from '../user/user';

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

	members()
	{
		return this.hasMany('HotelGroupMembersDB', 'guild_id');
	}

	room()
	{
		return this.hasOne('HotelRoomDB', 'id', 'room_id');
	}

	owner()
	{
		return this.belongsTo('HotelUserDB', 'user_id');
	}

	static loadGroupInfo(id = 0)
	{
		return new Promise((resolve, reject) =>
		{
			if(id == 0 || null) return reject(new Error('invalid_paramemters'));
			
			return HotelGroupDB.where('id', id).fetch({
				withRelated: [
                    {'owner': (qb) => {
                        qb.column('id', 'username', 'last_online', 'motto', 'look', 'online');
                    }},
                    {'room': (qb) => {
                        qb.column('id', 'name');
                    }}
                ],
                columns: ['id', 'user_id', 'name', 'description', 'room_id', 'badge', 'date_created']
			})

			.then((result) =>
			{
				if(result == null) return reject(new Error('invalid_group'));

				return resolve(result.toJSON());
			})

			.catch((err) =>
			{
				return reject(err);
			});
		});
	}

	static loadRandomGroups()
	{
		return new Promise((resolve, reject) =>
		{
			return HotelGroupDB.query((qb) => {
				qb.whereNotIn('id', __config.database.hides.randomGroupsHideGroup).orderByRaw('RAND()').limit(9);
			}).fetchAll({
				withRelated: [
					{'owner': (qb) => {
						qb.columns('id', 'username');
					}}
				],
				columns: ['id', 'user_id', 'name', 'description', 'badge']
			})

			.then((results) =>
			{
				if(results == null) return reject(new Error('invalid_groups'));

				return resolve(results.toJSON());
			})

			.catch((err) =>
			{
				return reject(err);
			});
		});
	}
}

export default Adapter.model('HotelGroupDB', HotelGroupDB);