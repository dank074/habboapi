import Adapter from '../../database/adapter';
import HotelPermissionDB from '../../database/models/hotel/permission/permission';

class Staff
{
    static staff_list()
    {
        return new Promise((resolve, reject) =>
        {
            return new HotelPermissionDB().query((qb) => {
                qb.whereIn('id', __config.staff_page_ranks).orderBy('id', 'DESC');
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
                return resolve(result.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
}

export default Staff;