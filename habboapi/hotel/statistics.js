import bcrypt from 'bcrypt';
import HotelUser from '../database/models/hotel/user/user';
import HotelRoom from '../database/models/hotel/room/room';
import HotelGroup from '../database/models/hotel/group/group';
import HotelItem from '../database/models/hotel/furniture/item';

class Statistics
{
    static total_users()
    {
        return new HotelUser().count();
    }

    static total_rooms()
    {
        return new HotelRoom().count();
    }

    static total_groups()
    {
        return new HotelGroup().count();
    }

    static total_items()
    {
        return new HotelItem().count();
    }

    static users_online()
    {
        return new HotelUser().where({online: '1'}).count();
    }

    static latest_user()
    {
        return new Promise((resolve, reject) =>
        {
            return new HotelUser().query((qb) => {
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
            return new HotelRoom().query((qb) => {
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

    static top_rooms()
    {
        return new Promise((resolve, reject) =>
        {
            return new HotelRoom().query((qb) => {
                qb.whereNot('score', 0).orderBy('score', 'DESC').limit(5);
            }).fetchAll({
                columns: ['id', 'name', 'description', 'users']
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