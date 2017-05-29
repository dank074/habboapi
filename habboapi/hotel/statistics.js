import bcrypt from 'bcrypt';
import HotelUser from '../database/models/user/user';

class Statistics
{
    static users_online()
    {
        return new Promise((resolve, reject) =>
        {
            return new HotelUser().where({online: '1'}).count()

            .then((result) =>
            {
                if(result == null) return reject(new Error('no_users'));

                return resolve(result);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
}

export default Statistics;