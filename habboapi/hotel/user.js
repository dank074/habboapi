import bcrypt from 'bcrypt';
import Database from '../database';

export default class HotelUser
{
    static loadUserInfo(id, username)
    {
        return Database.Models.Hotel.User.User.loadUserInfo(id, username);
    }

    static loadUserList(query)
    {
        return Database.Models.Hotel.User.User.loadUserList(query);
    }

    static loadProfileInfo(id, username)
    {
        return Database.Models.Hotel.User.User.loadProfileInfo(id, username);
    }

    static loadProfileComments(query)
    {
        return Database.Models.Api.ProfileComments.loadProfileComments(query);
    }

    static addProfileComment(id, userId, comment)
    {
        return Database.Models.Api.ProfileComments.addProfileComment(id, userId, comment);
    }

    static updateHotelUser(id, data)
    {
        return Database.Models.Hotel.User.User.updateUser(id, data);
    }

    static updateHotelUserPassword(id, password, passwordNew)
    {
        return Database.Models.Hotel.User.User.updatePassword(id, password, passwordNew);
    }

    static updateHotelUserEmail(id, password, email)
    {
        return this.validateEmail(email)

        .then(() =>
        {
            return Database.Models.Hotel.User.User.updateEmail(id, password, email);
        });
    }

    static updateHotelUserSettings(id, data)
    {
        return Database.Models.Hotel.User.Settings.updateSettings(id, data);
    }

    static updateHotelUserClient(id, authTicket, ip)
    {
        return Database.Models.Hotel.User.User.updateClient(id, authTicket, ip);
    }

    static addUser(username = null, email = null, password = null, ip = null)
    {
        return new Promise((resolve, reject) =>
        {
            if(username == null || email == null || password == null || ip == null) return reject(new Error('invalid_paramemters'));

            return this.validateUsername(username)

            .then(() =>
            {
                return this.validateEmail(email);
            })

            .then(() =>
            {
                return new Database.Models.Hotel.User.User().where('ip_register', ip).count();
            })

            .then((count) =>
            {
                if(count >= __config.userSettings.userNew.maxAccountsPerIp) return reject(new Error('max_accounts'));

                return new Database.Models.Hotel.User.User({
                    id: null,
                    username: username,
                    real_name: '',
                    password: bcrypt.hashSync(password, __config.passwordSalt),
                    mail: email,
                    mail_verified: '0',
                    account_created: Math.floor(Date.now() / 1000),
                    account_day_of_birth: '0',
                    last_login: Math.floor(Date.now() / 1000),
                    last_online: Math.floor(Date.now() / 1000),
                    motto: __config.userSettings.userNew.motto,
                    look: __config.userSettings.userNew.figure,
                    gender: __config.userSettings.userNew.gender,
                    rank: __config.userSettings.userNew.rank,
                    credits: __config.userSettings.userNew.credits,
                    pixels: __config.userSettings.userNew.duckets,
                    points: __config.userSettings.userNew.diamonds,
                    online: '0',
                    auth_ticket: '',
                    ip_register: ip,
                    ip_current: ip,
                    machine_id: '',
                    home_room: __config.userSettings.userNew.homeRoom}).save(null, {method: 'insert'});
            })

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_user'));

                return new Database.Models.Hotel.User.Settings({
                    id: null,
                    user_id: result.toJSON().id
                }).save(null, {method: 'insert'});
            })

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_user_settings'));

                return new Database.Models.Hotel.User.Currency({
                    user_id: result.toJSON().user_id,
                    type: '0',
                    amount: __config.userSettings.userNew.duckets
                }).save(null, {method: 'insert'});
            })

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_user_currency'));

                return new Database.Models.Hotel.User.Currency({
                    user_id: result.toJSON().user_id,
                    type: '5',
                    amount: __config.userSettings.userNew.diamonds
                }).save(null, {method: 'insert'});
            })

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_user_currency'));

                return resolve(null);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static validateUsername(username)
    {
        return Database.Models.Hotel.User.User.validateUsername(username);
    }

    static validateEmail(email)
    {
        return Database.Models.Hotel.User.User.validateEmail(email);
    }
}