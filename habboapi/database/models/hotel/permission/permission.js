import Adapter from '../../../adapter';
import HotelUserDB from '../user/user';

class HotelPermissionDB extends Adapter.Model
{
    get tableName()
    {
        return 'permissions';
    }

    get hasTimestamps()
    {
        return false;
    }

    users()
    {
        return this.hasMany('HotelUserDB', 'rank', 'id');
    }

    static loadStaffList()
    {
        return new Promise((resolve, reject) =>
        {
            return HotelPermissionDB.query((qb) => {
                qb.whereNotIn('id', __config.database.hides.staffListHideRank).orderBy('id', 'DESC');
            }).fetchAll({
                withRelated: [
                    {'users': (qb) => {
                        qb.column('id', 'username', 'last_online', 'motto', 'look', 'rank', 'online');
                    }}
                ],
                columns: ['id', 'rank_name']
            })
            
            .then((result) =>
            {
                if(result == null) return reject(new Error('no_staff'));

                return resolve(result.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
}

export default Adapter.model('HotelPermissionDB', HotelPermissionDB);