import HotelStatistics from '../hotel/statistics';
import ApiPermission from '../database/models/api/permission';

class Community
{
    static community_info()
    {
        return new Promise((resolve, reject) =>
        {
            let community_info = {};

            HotelStatistics.total_users()

            .then((count) =>
            {
                community_info.total_users = count;

                return HotelStatistics.total_rooms();
            })

            .then((count) =>
            {
                community_info.total_rooms = count;

                return HotelStatistics.total_groups();
            })

            .then((count) =>
            {
                community_info.total_groups = count;

                return HotelStatistics.total_items();
            })

            .then((count) =>
            {
                community_info.total_items = count;

                return HotelStatistics.latest_user();
            })

            .then((user) =>
            {
                community_info.latest_user = user;

                return HotelStatistics.latest_room();
            })

            .then((room) =>
            {
                community_info.latest_room = room;
                
                return resolve(community_info);
            })

            .catch((err) =>
            {
                return reject(err);
            })
        });
    }

    static staff_users()
    {
        return new Promise((resolve, reject) =>
        {
            return new ApiPermission().query((qb) => {
                qb.whereIn('rank_id', __config.staff_page_ranks).orderBy('rank_id', 'DESC');
            }).fetchAll({
                withRelated: [
                    {'users': (qb) => {
                        qb.column('id', 'username', 'last_online', 'motto', 'look', 'rank', 'online');
                    }}
                ],
                columns: ['rank_id', 'rank_name']
            })
            
            .then((result) =>
            {
                return resolve(result);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
}

export default Community;