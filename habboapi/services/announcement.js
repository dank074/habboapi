import ApiAnnouncement from '../database/models/api/announcement';

class Announcement
{
    static announcement_list()
    {
        return new Promise((resolve, reject) =>
		{
            return new ApiAnnouncement().query((qb) => {
                qb.where('is_hidden', '0').orderBy('id', 'DESC').limit(5);
            }).fetchAll({
                withRelated: [
                    {'owner': (qb) => {
                        qb.column('id', 'user_name');
                    }},
                ],
                columns: ['id', 'user_id', 'title', 'content', 'created_at', 'updated_at']
            })
            
            .then((result) =>
            {
			    if(result == null) return reject(new Error('no_announcements'));
                
                return resolve(result.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static add_announcement(user_id, title, content)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || title == null || content == null) return reject(new Error('invalid_parameters'));

            return new ApiAnnouncement({
                id: null,
                user_id: user_id,
                title: title,
                content: content,
                is_hidden: '0'}).save(null, {method: 'insert'})

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_announcement'));

                return resolve(result.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static edit_announcement(id, user_id, title, content, is_hidden)
    {
        return new Promise((resolve, reject) =>
        {
            if(id == null || user_id == null || title == null || content == null || is_hidden == null) return reject(new Error('invalid_parameters'));

            return new ApiAnnouncement({
                id: id,
                title: title,
                content: content,
                is_hidden: is_hidden
            }).save()

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_announcement'));

                return resolve(result.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            })
        });
    }

    static delete_announcement(id, user_id)
    {
        if(id == null || user_id) return false;

        return new ApiAnnouncement({id: id}).fetch()

        .then((result) =>
        {
            if(result == null) return false;

            result.destroy();

            return true;
        })

        .catch((err) =>
        {
            return false;
        });
    }
}

export default Announcement;