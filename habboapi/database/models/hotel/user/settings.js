import Adapter from '../../../adapter';
import HotelUserDB from './user';

class HotelUserSettingsDB extends Adapter.Model
{
	get tableName()
	{
		return 'users_settings';
	}

	get hasTimestamps()
	{
		return false;
	}

	user()
	{
		return this.belongsTo('HotelUserDB', 'user_id');
	}

	static updateSettings(id = 0, data = null)
	{
		return new Promise((resolve, reject) =>
        {
            if(id == 0 || null || typeof data !== 'object' || data == null) return reject(new Error('invalid_paramemters'));

            return HotelUserSettingsDB.where('user_id', id).fetch({
                columns: ['id', 'user_id', 'block_following', 'block_friendrequests', 'block_roominvites', 'old_chat', 'ignore_bots', 'ignore_pets']
            })

            .then((result) =>
            {
                if(result == undefined || null) return reject(new Error('invalid_settings'));

                let update = {
                    block_following: (data.block_following == '0' || null) ? '0' : '1',
                	block_friendrequests: (data.block_friendrequests == '0' || null) ? '0' : '1',
                	block_roominvites: (data.block_roominvites == '0' || null) ? '0' : '1',
                	old_chat: (data.old_chat == '0' || null) ? '0' : '1',
                	ignore_bots: (data.ignore_bots == '0' || null) ? '0' : '1',
                	ignore_pets: (data.ignore_pets == '0' || null) ? '0' : '1'
                };

                result.save(update, {method: 'update'});

                return resolve(null);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
	}

	static loadMostOnline()
	{
		return new Promise((resolve, reject) =>
        {
            return HotelUserSettingsDB.query((qb) => {
                qb.whereNotIn('user_id', __config.database.hides.mostOnlineHideUser).andWhereNot('online_time', 0).orderBy('online_time', 'DESC').limit(10);
            }).fetchAll({
                withRelated: [
                    {'user': (qb) => {
                        qb.column('id', 'username', 'motto', 'look');
                    }}
                ],
                columns: ['user_id', 'online_time']
            })

            .then((results) =>
            {
                if(results == null) return resolve(null);
                
                let list = [];

                results = results.toJSON();

                results.forEach((data) =>
                {
                    data.user.online_time = data.online_time;

                    list.push(data.user);
                });

                return resolve(list);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
	}

	static loadMostRespected()
	{
		return new Promise((resolve, reject) =>
        {
            return HotelUserSettingsDB.query((qb) => {
                qb.whereNotIn('user_id', __config.database.hides.mostRespectedHideUser).andWhereNot('respects_received', 0).orderBy('respects_received', 'DESC').limit(10);
            }).fetchAll({
                withRelated: [
                    {'user': (qb) => {
                        qb.column('id', 'username', 'motto', 'look');
                    }}
                ],
                columns: ['user_id', 'respects_received']
            })

            .then((results) =>
            {
                if(results == null) return resolve(null);

                let list = [];

                results = results.toJSON();

                results.forEach((data) =>
                {
                    data.user.respects_received = data.respects_received;

                    list.push(data.user);
                });

                return resolve(list);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
	}
}

export default Adapter.model('HotelUserSettingsDB', HotelUserSettingsDB);