import HotelUserDB from '../../database/models/hotel/user/user';
import HotelRoomDB from '../../database/models/hotel/room/room';
import HotelGroupDB from '../../database/models/hotel/group/group';
import HotelItemDB from '../../database/models/hotel/furniture/item';

class Statistics
{
    static statistic_info()
    {
        return new Promise((resolve, reject) =>
        {
            let statistic_info = {};

            return Statistics.total_users()

            .then((count) =>
            {
                statistic_info.total_users = count;

                return Statistics.total_rooms();
            })

            .then((count) =>
            {
                statistic_info.total_rooms = count;

                return Statistics.total_groups();
            })

            .then((count) =>
            {
                statistic_info.total_groups = count;

                return Statistics.total_items();
            })

            .then((count) =>
            {
                statistic_info.total_items = count;

                return Statistics.latest_user();
            })

            .then((user) =>
            {
                statistic_info.latest_user = user;
                
                return Statistics.latest_room()
            })

            .then((room) =>
            {
                statistic_info.latest_room = room;

                return resolve(statistic_info);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static total_users()
    {
        return new HotelUserDB().count();
    }

    static total_rooms()
    {
        return new HotelRoomDB().count();
    }

    static total_groups()
    {
        return new HotelGroupDB().count();
    }

    static total_items()
    {
        return new HotelItemDB().count();
    }

    static users_online()
    {
        return new HotelUserDB().where({online: '1'}).count();
    }

    static latest_user()
    {
        return new Promise((resolve, reject) =>
        {
            return new HotelUserDB().query((qb) => {
                qb.orderBy('id', 'DESC').limit(1);
            }).fetch({
                columns: ['id', 'username', 'last_online', 'motto', 'look', 'online']
            })
            
            .then((result) =>
            {
                return resolve(result.toJSON());
            })
            
            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static latest_room()
    {
        return new Promise((resolve, reject) =>
        {
            return new HotelRoomDB().query((qb) => {
                qb.orderBy('id', 'DESC').limit(1);
            }).fetch({
                withRelated: [
                    {'owner': (qb) => {
                        qb.column('id', 'username');
                    }}
                ],
                columns: ['id', 'owner_id', 'name', 'users', 'users_max', 'score']
            })
            
            .then((result) =>
            {
                return resolve(result.toJSON());
            })
            
            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
}

export default Statistics;