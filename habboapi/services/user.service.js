import bcrypt from 'bcrypt-nodejs';
import User from '../database/models/user/user';
import UserSettings from '../database/models/user/user_settings';

class UserService
{
    static validate_username(user_name)
    {
        return new Promise((resolve, reject) =>
        {
            let regex = new RegExp(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{1,20}$/g);
            
            if(user_name == null || regex.test(user_name) == false) return reject(new Error('invalid_paramemters'));

            return new User({username: user_name}).fetch()

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

            return new User({mail: email_address}).fetch()

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

    static user_info(user_id)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || user_id == 0) return reject(new Error('invalid_paramemters'));

            return new User({id: user_id}).fetch({
                withRelated: [
                    'last_login',
                    {'settings': (qb) =>
                    {
                        qb.column('id', 'user_id', 'block_following', 'block_friendrequests', 'block_roominvites', 'old_chat', 'ignore_bots', 'ignore_pets');
                    }}
                ],
                columns: ['id', 'username', 'mail', 'account_created', 'account_day_of_birth', 'motto', 'look', 'rank', 'credits', 'pixels', 'points']
            })

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_user'));

                return resolve(result.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static update_user(user_id, data)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || user_id == 0 || data == null || data.length == 0) return reject(new Error('invalid_paramemters'));

            return new User({id: user_id}).fetch({
                columns: ['account_day_of_birth', 'motto', 'look', 'gender', 'home_room']
            })

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_user'));

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

    static update_user_settings(user_id, data)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || user_id == 0 || data == null || data.length == 0) return reject(new Error('invalid_paramemters'));

            return new UserSettings({user_id: user_id}).fetch({
                columns: ['block_following', 'block_friendrequests', 'block_roominvites', 'old_chat', 'ignore_bots', 'ignore_pets']
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

    static update_user_password(user_id, new_password, password)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || user_id == 0 || new_password == null || password == null) return reject(new Error('invalid_paramemters'));

            return new User({id: user_id}).fetch({
                columns: ['id', 'password']
            })

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_user'));

                if(bcrypt.compareSync(password, result.toJSON().password) == false) return reject(new Error('invalid_paramemters'));

                result.set({password: bcrypt.hashSync(new_password, 10)});

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

    static update_user_email(user_id, new_email, password)
    {
        return new Promise((result, reject) =>
        {
            if(user_id == null || user_id == 0 || new_email == null || password == null) return reject(new Error('invalid_paramemters'));

            return this.validate_email(new_email)

            .then(() =>
            {
                return new User({id: user_id}).fetch({
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
                return new User({
                    id: null,
				    username: user_name,
                    real_name: '',
				    password: bcrypt.hashSync(user_pass, 10),
                    mail: user_email,
                    mail_verified: '0',
                    account_created: Math.floor(Date.now() / 1000),
                    account_day_of_birth: '0',
                    last_login: Math.floor(Date.now() / 1000),
                    last_online: Math.floor(Date.now() / 1000),
                    motto: __config.user_settings.new_user.motto,
                    look: __config.user_settings.new_user.figure,
                    gender: __config.user_settings.new_user.gender,
                    rank: __config.user_settings.new_user.rank,
                    credits: __config.user_settings.new_user.credits,
                    pixels: __config.user_settings.new_user.pixels,
                    points: __config.user_settings.new_user.points,
                    online: '0',
                    auth_ticket: '',
                    ip_register: user_ip,
                    ip_current: user_ip,
                    home_room: __config.user_settings.new_user.home_room}).save(null, {method: 'insert'})
            })

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_user'));

                return resolve(result.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
}

export default UserService;