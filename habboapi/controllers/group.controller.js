import Group from '../database/models/group/group';

class GroupController
{
    group_info(group_id)
    {
        return new Promise((resolve, reject) =>
		{
			if(group_id == null || group_id == 0) return reject(new Error('invalid_paramemters'));
            
            return new Group({id: group_id}).fetch({
                withRelated: [
                    {'owner': (qb) => {
                        qb.column('id', 'username', 'look');
                    }},
                    {'members': (qb) => {
                        qb.column('id', 'guild_id', 'user_id', 'level_id', 'member_since');
                    }},
                    {'members.user': (qb) => {
                        qb.column('id', 'username', 'motto', 'look');
                    }},
                    {'room': (qb) => {
                        qb.column('id', 'owner_id', 'name', 'model');
                    }},
                    {'room.owner': (qb) => {
                        qb.column('id', 'username');
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

export default GroupController;