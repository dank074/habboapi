import HotelUser from '../../database/models/hotel/user/user';
import HotelUserSettings from '../../database/models/hotel/user/user_settings'

class Leaderboards
{
    static leaderboards_info()
    {
        return new Promise((resolve, reject) =>
        {
            let leaderboards_info = {};

            return Leaderboards.most_credits()

            .then((users) =>
            {
                leaderboards_info.most_credits = users;

                return Leaderboards.most_respected();
            })

            .then((users) =>
            {
                leaderboards_info.most_respected = users;

                return Leaderboards.most_online();
            })

            .then((users) =>
            {
                leaderboards_info.most_online = users;

                return resolve(leaderboards_info);
            })

            .catch((err) =>
            {
                return reject(err);
            })
        });
    }

    static most_credits()
    {
        return new Promise((resolve, reject) =>
        {
            return new HotelUser().query((qb) => {
                qb.whereNot('credits', 0).orderBy('credits', 'DESC').limit(5);
            }).fetchAll({
                columns: ['id', 'username', 'last_online', 'motto', 'look', 'credits', 'online']
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

    static most_respected()
    {
        return new Promise((resolve, reject) =>
        {
            let most_respected = [];

            return new HotelUserSettings().query((qb) => {
                qb.whereNot('respects_received', 0).orderBy('respects_received', 'DESC').limit(5);
            }).fetchAll({
                withRelated: [
                    {'user': (qb) => {
                        qb.column('id', 'username', 'last_online', 'motto', 'look', 'online');
                    }}
                ],
                columns: ['user_id', 'respects_received']
            })
            
            .then((result) =>
            {
                result = result.toJSON();

                result.forEach((data) =>
                {
                    data.user.respects_received = data.respects_received;

                    most_respected.push(data.user);
                });

                return resolve(most_respected);
            })
            
            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static most_online()
    {
        return new Promise((resolve, reject) =>
        {
            let most_online = [];

            return new HotelUserSettings().query((qb) => {
                qb.whereNot('online_time', 0).orderBy('online_time', 'DESC').limit(5);
            }).fetchAll({
                withRelated: [
                    {'user': (qb) => {
                        qb.column('id', 'username', 'last_online', 'motto', 'look', 'online');
                    }}
                ],
                columns: ['user_id', 'online_time']
            })
            
            .then((result) =>
            {
                result = result.toJSON();

                result.forEach((data) =>
                {
                    data.user.online_time = data.online_time;

                    most_online.push(data.user);
                });

                return resolve(most_online);
            })
            
            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
}

export default Leaderboards;