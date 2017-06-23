import Adapter from '../../database/adapter';
import HotelRoomDB from '../../database/models/hotel/room/room';
import HotelPermissionDB from '../../database/models/hotel/permission/permission';

class Community
{
    static community_info()
    {
        return new Promise((resolve, reject) =>
        {
            let community_info = {};

            return Community.random_users()

            .then((users) =>
            {
                community_info.random_users = users;

                return Community.random_rooms();
            })

            .then((rooms) =>
            {
                community_info.random_rooms = rooms;

                return Community.random_groups();
            })

            .then((groups) =>
            {
                community_info.random_groups = groups;
                
                return Community.active_rooms();
            })

            .then((rooms) =>
            {
                community_info.active_rooms = rooms;
                
                return resolve(community_info);
            })

            .catch((err) =>
            {
                return reject(err);
            })
        });
    }

    static random_users()
    {
        return new Promise((resolve, reject) =>
        {
            return Adapter.knex.raw('SELECT `id`,`username`,`last_online`,`motto`,`look`,`online` FROM `users` ORDER BY RAND() LIMIT 5')

            .then((result) =>
            {
                return resolve(result[0]);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        })
    }

    static random_rooms()
    {
        return new Promise((resolve, reject) =>
        {
            return Adapter.knex.raw('SELECT `id`,`name`,`description` FROM `rooms` ORDER BY RAND() LIMIT 5')

            .then((result) =>
            {
                return resolve(result[0]);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        })
    }

    static random_groups()
    {
        return new Promise((resolve, reject) =>
        {
            return Adapter.knex.raw('SELECT `id`,`name`,`description`,`badge`,`date_created` FROM `guilds` ORDER BY RAND() LIMIT 5')

            .then((result) =>
            {
                return resolve(result[0]);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        })
    }

    static active_rooms()
    {
        return new Promise((resolve, reject) =>
        {
            return new HotelRoomDB().query((qb) => {
                qb.whereNot('users', 0).orderBy('users', 'DESC').limit(5);
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

export default Community;