import Adapter from '../../../adapter';
import HotelRoomEnterLogDB from './enterLog';
import HotelRoomImagesDB from './images';
import HotelRoomPromotionsDB from './promotions';
import HotelRoomVotesDB from './votes';
import HotelGroupDB from '../group/group';
import HotelUserDB from '../user/user';

class HotelRoomDB extends Adapter.Model
{
	get tableName()
	{
		return 'rooms';
	}

	get hasTimestamps()
	{
		return false;
	}

	entries()
	{
		return this.hasMany('HotelRoomEntriesDB', 'room_id');
	}

	images()
	{
		return this.hasMany('HotelRoomImagesDB', 'room_id');
	}

	promotions()
	{
		return this.hasMany('HotelRoomPromotionsDB', 'room_id');
	}

	votes()
	{
		return this.hasMany('HotelRoomVotesDB', 'room_id');
	}

	group()
	{
		return this.belongsTo('HotelGroupDB', 'id', 'room_id');
	}

	owner()
	{
		return this.belongsTo('HotelUserDB', 'owner_id')
	}

	static loadRoomInfo(id = 0)
	{
		return new Promise((resolve, reject) =>
		{
			if(id == 0 || null) return reject(new Error('invalid_paramemters'));

			return HotelRoomDB.where('id', id).fetch({
				withRelated: [
                    {'owner': (qb) => {
                        qb.column('id', 'username', 'last_online', 'motto', 'look', 'online');
                    }},
                    {'group': (qb) => {
						qb.column('id', 'name', 'room_id');
					}}
                ],
                columns: ['id', 'owner_id', 'name', 'description', 'users', 'users_max', 'guild_id', 'score', 'tags']
			})

			.then((result) =>
			{
				if(result == null) return reject(new Error('invalid_room'));

				return resolve(result.toJSON());
			})

			.catch((err) =>
			{
				return reject(err);
			});
		});
	}

	static loadRandomRooms()
	{
		return new Promise((resolve, reject) =>
		{
			return HotelRoomDB.query((qb) => {
				qb.whereNotIn('id', __config.database.hides.randomRoomsHideRoom).andWhere('state', 'open').orderByRaw('RAND()').limit(9);
			}).fetchAll({
				withRelated: [
					{'owner': (qb) => {
						qb.column('id', 'username');
					}}
				],
				columns: ['id', 'owner_id', 'name', 'description']
			})

			.then((results) =>
			{
				if(results == null) return reject(new Error('invalid_rooms'));

				return resolve(results.toJSON());
			})

			.catch((err) =>
			{
				return reject(err);
			});
		});
	}

	static loadActiveRooms()
	{
		return new Promise((resolve, reject) =>
		{
			return HotelRoomDB.query((qb) => {
				qb.whereNotIn('id', __config.database.hides.activeRoomsHideRoom).andWhereNot('users', 0).orderBy('users', 'DESC').limit(5);
			}).fetchAll({
				columns: ['id', 'owner_name', 'name', 'description', 'users']
			})

			.then((results) =>
			{
				if(results == null) return reject(new Error('invalid_rooms'));

				return resolve(results.toJSON());
			})

			.catch((err) =>
			{
				return reject(err);
			});
		});
	}

	static loadLatestRoom()
	{
		return new Promise((resolve, reject) =>
        {
            return HotelRoomDB.query((qb) => {
                qb.orderBy('id', 'DESC').limit(1);
            }).fetch({
                withRelated: [
                    {'owner': (qb) => {
                        qb.column('id', 'username');
                    }}
                ],
                columns: ['id', 'owner_id', 'name', 'description', 'users', 'users_max', 'score']
            })
            
            .then((result) =>
            {
                if(result == null) return resolve(null);

                return resolve(result.toJSON());
            })
            
            .catch((err) =>
            {
                return reject(err);
            });
        });
	}
}

export default Adapter.model('HotelRoomDB', HotelRoomDB);