import crypto from 'crypto';
import HotelUserDB from '../database/models/hotel/user/user';

export default class AuthenticationLocal
{
    static login(username = null, password = null, ip = null)
    {
        return new Promise((resolve, reject) =>
        {
            if(username == null || password == null || ip == null) return reject(new Error('invalid_paramemters'));

            let user        = [];
            let authTicket  = null;

            return HotelUserDB.userLogin(username, password)

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_login'));

                user        = result;
                authTicket  = crypto.randomBytes(7).toString('hex');

                return HotelUserDB.updateClient(user.id, authTicket, ip);
            })

            .then((result) =>
            {
                return resolve({
                    id: user.id,
                    username: user.username
                });
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
}