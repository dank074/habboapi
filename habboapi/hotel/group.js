import HotelGroup from '../database/models/group/group';

class Group
{
    static group_info(group_id)
    {
        return new Promise((resolve, reject) =>
		{
			if(group_id == null || group_id == 0) return reject(new Error('invalid_paramemters'));
            
            return new HotelGroup({id: group_id}).fetch({
                withRelated: [
                    {'owner': (qb) => {
                        qb.column('id', 'username', 'last_online', 'motto', 'look', 'online');
                    }},
                    {'members': (qb) => {
                        qb.column('id', 'guild_id', 'user_id', 'level_id', 'member_since');
                    }},
                    {'members.user': (qb) => {
                        qb.column('id', 'username', 'motto', 'look', 'online');
                    }},
                    {'room': (qb) => {
                        qb.column('id', 'owner_id', 'name', 'users', 'users_max');
                    }},
                    {'room.owner': (qb) => {
                        qb.column('id', 'username');
                    }},
                    {'forums': (qb) => {
                        qb.column('id', 'guild_id', 'user_id', 'subject', 'message', 'pinned', 'timestamp');
                    }},
                    {'forums.owner': (qb) => {
                        qb.column('id', 'username', 'look');
                    }}
                ],
                columns: ['id', 'user_id', 'name', 'description', 'room_id', 'badge', 'date_created']
            })
            
            .then((result) =>
            {
			    if(result == null) return reject(new Error('invalid_group'));
                
                return resolve(result.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
}

export default Group;