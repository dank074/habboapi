import Adapter from '../../../adapter';
import HotelUserDB from '../user/user';

class HotelBanDB extends Adapter.Model
{
	get tableName()
	{
		return 'bans';
	}

	get hasTimestamps()
	{
		return false;
	}

	user()
	{
		return this.belongsTo('HotelUserDB', 'user_id');
	}

	staff()
	{
		return this.belongsTo('HotelUserDB', 'user_staff_id');
	}

    static checkBan(id = 0, ip = null)
	{
		return new Promise((resolve, reject) =>
		{
			return HotelBanDB.query((qb) => {
                if(id == 0 || null && ip != null) qb.where('ip', ip).andWhere('type', 'ip').orderBy('id', 'DESC');
                else if(id != 0 || null && ip == null) qb.where('user_id', id).andWhere('type', 'account').orderBy('id', 'DESC');
				else if(id != 0 || null && ip != null) qb.where('user_id', id).orWhere('ip', ip).orderBy('id', 'DESC');
				else return reject(new Error('invalid_paramemters'));
            }).fetchAll({
                withRelated: [
                    {'user': (qb) => {
                        qb.columns('id', 'username');
                    }}  
                ],
                columns: ['user_id', 'ip', 'timestamp', 'ban_expire', 'ban_reason', 'type']
            })

            .then((results) =>
            {
                if(results == null) return reject(new Error('not_banned'));

                results = results.toJSON();

                results.forEach((ban, key) =>
                {
                    if(ban.ban_expire * 1000 >= new Date().getTime()) return resolve(ban);
                });

                return reject(new Error('not_banned'));
            })

            .catch((err) =>
            {
                return reject(err);
            });
		})
	}
}

export default Adapter.model('HotelBanDB', HotelBanDB);