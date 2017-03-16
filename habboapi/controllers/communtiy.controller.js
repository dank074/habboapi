import Item from '../database/models/furniture/item';
import Room from '../database/models/room/room';
import RoomPromotion from '../database/models/room/room_promotion';
import User from '../database/models/user/user';
import UserPets from '../database/models/user/user_pets';
import Group from '../database/models/group/group';
import Permission from '../database/models/permission/permission';

class CommunityController
{
    static community_info()
    {
        return new Promise((resolve, reject) =>
		{
			let community_info = {};

			return this.latest_user()

			.then((result) =>
			{
				community_info.latest_user = result;

				return this.statistics();
			})

			.then((result) =>
			{
				community_info.statistics = result;

				return this.room_promotions();
			})

			.then((result) =>
			{
				community_info.room_promotions = result;
				
				return resolve(community_info);
			})

			.catch(function(err)
			{
				return reject(err);
			});
		});
    }

    static latest_user()
    {
        return new Promise((resolve, reject) =>
        {
            return new User().query((qb) => {
                qb.orderBy('id', 'DESC').limit(1);
            }).fetch({
                columns: ['id', 'username', 'motto', 'look']
            })
            
            .then((result) =>
            {
                if(result == null) return reject(new Error('no_users'));
                
                return resolve(result.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static statistics()
    {
        return new Promise((resolve, reject) =>
		{
			let hotel_statistics = {};

			return new Item().count()

			.then((result) =>
			{
				hotel_statistics.total_items = result;

				return new Room().count();
			})

			.then((result) =>
			{
				hotel_statistics.total_rooms = result;

				return new User().count();
			})

			.then((result) =>
			{
				hotel_statistics.total_users = result;

				return new Group().count();
			})

			.then((result) =>
			{
				hotel_statistics.total_groups = result;

				return new UserPets().count();
			})

			.then((result) =>
			{
				hotel_statistics.total_pets = result;

				return resolve(hotel_statistics);
			})

			.catch((err) =>
			{
				return reject(err);
			});
		});
    }

    static staff_users()
    {
        return new Promise((resolve, reject) =>
        {
            return new Permission().query((qb) => {
                qb.whereIn('id', __config.staff_page_ranks).orderBy('id', 'DESC');
            }).fetchAll({
                withRelated: [
                    {'users': (qb) => {
                        qb.column('id', 'username', 'motto', 'look', 'rank');
                    }}
                ],
                columns: ['id', 'rank_name']
            })
            
            .then((result) =>
            {
                if(result == null) return reject(new Error('no_staff'));

                return resolve(result);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static room_promotions()
    {
        return new Promise((resolve, reject) =>
        {
            return new RoomPromotion().fetchAll({
                withRelated: [
                    {'room': (qb) => {
                        qb.column('id', 'name', 'model');
                    }}
                ],
                columns: ['room_id', 'title', 'description', 'end_timestamp']
            })
            
            .then((result) =>
            {
			    if(result == null) return reject(new Error('no_staff'));
                
                return resolve(result.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
}

export default CommunityController;