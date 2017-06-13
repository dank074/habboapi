import bcrypt from 'bcrypt';
import HotelUser from '../database/models/hotel/user/user';
import HotelUserBan from '../database/models/hotel/user/user_ban';
import HotelUserCurrency from '../database/models/hotel/user/user_currency';
import HotelUserSettings from '../database/models/hotel/user/user_settings';

class User
{
    static validate_username(user_name)
    {
        return new Promise((resolve, reject) =>
        {
            let regex = new RegExp(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{1,20}$/g);
            
            if(user_name == null || regex.test(user_name) == false) return reject(new Error('invalid_paramemters'));

            __config.hotel.prohibited_usernames.forEach((username) =>
            {
                if(user_name.indexOf(username) != -1) return reject(new Error('username_unavailable'));
            });

            return new HotelUser({username: user_name}).fetch()

            .then((result) =>
            {
                if(result == null) return resolve(null);

                return reject(new Error('username_unavailable'));
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static validate_email(email_address)
    {
        return new Promise((resolve, reject) =>
        {
            let regex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g);
            
            if(email_address == null || regex.test(email_address) == false) return reject(new Error('invalid_paramemters'));

            return new HotelUser({mail: email_address}).fetch()

            .then((result) =>
            {
                if(result == null) return resolve(null);

                return reject(new Error('email_unavailable'));
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static user_list(page)
    {
        return new Promise((resolve, reject) =>
        {
            if(page == null) page = 1;

            return new HotelUser().fetchPage({
                pageSize: 15,
                page: page,
                columns: ['id', 'username']
            })

            .then((results) =>
            {
                if(results == null) return reject(new Error('no_users'));

                console.log(results.toJSON());

                return resolve(results.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static user_info(user_id)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || user_id == 0) return reject(new Error('invalid_paramemters'));

            return new HotelUser({id: user_id}).fetch({
                withRelated: [
                    'last_login',
                    'currency',
                    {'settings': (qb) => {
                        qb.column(["id", "user_id"].concat(__config.hotel.user_settings));
                    }}
                ],
                columns: ["id", "username"].concat(__config.hotel.user_info)
            })

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_user'));

                let user_info = result.toJSON();

                if(user_info.currency.length > 0)
                {
                    user_info.duckets   = (user_info.currency[0].amount == undefined || null) ? 0 : user_info.currency[0].amount;
                    user_info.diamonds  = (user_info.currency[1].amount == undefined || null) ? 0 : user_info.currency[1].amount;
                }
                else
                {
                    user_info.duckets   = 0;
                    user_info.diamonds  = 0;
                }

                delete user_info.currency;

                return resolve(user_info);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static add_user(user_name, user_email, user_pass, user_ip)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_name == null || user_email == null || user_pass == null || user_ip == null) return reject(new Error('invalid_paramemters'));

            return this.validate_username(user_name)

            .then(() =>
            {
                return this.validate_email(user_email);
            })

            .then(() =>
            {
                return new HotelUser({
                    id: null,
                    username: user_name,
                    real_name: '',
                    password: bcrypt.hashSync(user_pass, __config.password_salt),
                    mail: user_email,
                    mail_verified: '0',
                    account_created: Math.floor(Date.now() / 1000),
                    account_day_of_birth: '0',
                    last_login: Math.floor(Date.now() / 1000),
                    last_online: Math.floor(Date.now() / 1000),
                    motto: __config.hotel.new_user.motto,
                    look: __config.hotel.new_user.figure,
                    gender: __config.hotel.new_user.gender,
                    rank: __config.hotel.new_user.rank,
                    credits: __config.hotel.new_user.credits,
                    pixels: __config.hotel.new_user.duckets,
                    points: __config.hotel.new_user.diamonds,
                    online: '0',
                    auth_ticket: '',
                    ip_register: user_ip,
                    ip_current: user_ip,
                    machine_id: '',
                    home_room: __config.hotel.new_user.home_room}).save(null, {method: 'insert'});
            })

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_user'));

                return new HotelUserSettings({
                    id: null,
                    user_id: result.toJSON().id
                }).save(null, {method: 'insert'});
            })

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_user_settings'));

                return new HotelUserCurrency({
                    user_id: result.toJSON().user_id,
                    type: '0',
                    amount: __config.hotel.new_user.duckets
                }).save(null, {method: 'insert'});
            })

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_user_currency'));

                return new HotelUserCurrency({
                    user_id: result.toJSON().user_id,
                    type: '5',
                    amount: __config.hotel.new_user.diamonds
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

    static update_password(user_id, new_password, password)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || user_id == 0 || new_password == null || password == null) return reject(new Error('invalid_paramemters'));

            return new HotelUser({id: user_id}).fetch({
                columns: ['id', 'password']
            })

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_user'));

                if(bcrypt.compareSync(password, result.toJSON().password) == false) return reject(new Error('invalid_paramemters'));

                result.set({password: bcrypt.hashSync(new_password, __config.password_salt)});

                return result.save();
            })

            .then((result) =>
            {
                return resolve(null);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static update_email(user_id, new_email, password)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || user_id == 0 || new_email == null || password == null) return reject(new Error('invalid_paramemters'));

            return this.validate_email(new_email)

            .then(() =>
            {
                return new HotelUser({id: user_id}).fetch({
                    columns: ['id', 'password', 'mail']
                });
            })

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_user'));

                if(bcrypt.compareSync(password, result.toJSON().password) == false) return reject(new Error('invalid_paramemters'));

                result.set({mail: new_email})

                return result.save();
            })

            .then((result) =>
            {
                return resolve(null);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static update_settings(user_id, data)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || user_id == 0 || data == null || data.length == 0) return reject(new Error('invalid_paramemters'));

            return new HotelUserSettings({user_id: user_id}).fetch({
                columns: __config.hotel.user_settings
            })

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_user'));

                Object.keys(data).forEach((key) =>
                {
                    data[key] = (data[key] == false) ? '0' : '1';
                });

                result.set(data);

                return result.save();
            })

            .then((result) =>
            {
                return resolve(result.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            })
        })
    }

    static check_ban(user_id)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || user_id == 0) return reject(new Error('invalid_paramemters'));

            return new HotelUser({id: user_id}).fetch({
                withRelated: [
                    'bans'
                ],
                columns: ['id', 'username']
            })

            .then((result) =>
            {
                let ban = result.toJSON();

                if(ban.bans.length > 0)
                {
                    if(ban.bans[0].ban_expire * 1000 >= new Date().getTime()) return resolve(ban);
                }

                return reject(null);
            })

            .catch((err) =>
            {
                return reject(null);
            })
        });
    }
}

export default User;