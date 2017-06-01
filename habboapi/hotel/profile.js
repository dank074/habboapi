import HotelUser from '../database/models/user/user';

class Profile
{
    static profile_info(user_name)
    {
        return new Promise((resolve, reject) =>
		{
			if(user_name == null) return reject(new Error('invalid_paramemters'));
            
            return new HotelUser({username: user_name}).fetch({
                withRelated: [
                    {'badges': (qb) => {
                        qb.column('user_id', 'slot_id', 'badge_code');
                    }},
                    {'rooms': (qb) => {
                        qb.column('id', 'owner_id', 'name', 'description', 'model', 'score');
                    }},
                    {'group_memberships': (qb) => {
                        qb.column('id', 'user_id', 'guild_id', 'member_since');
                    }},
                    {'group_memberships.group': (qb) => {
                        qb.column('id', 'user_id', 'name', 'description', 'badge');
                    }},
                    {'friends': (qb) => {
                        qb.column('user_one_id', 'user_two_id', 'friends_since');
                    }},
                    {'friends.user': (qb) => {
                        qb.column('id', 'username', 'last_online', 'motto', 'look', 'online');
                    }}
			    ],
			    columns: ['id', 'username', 'account_created', 'last_online', 'motto', 'look', 'online']
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

export default Profile;