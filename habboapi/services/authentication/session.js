import ApiSession from '../../database/models/api/session';

class Session
{
    static create_session(user_id, user_name, user_ip, user_agent)
    {
        return new Promise((resolve, reject) =>
        {
            user_id = (user_id == null || user_id == 0 || typeof user_id != 'number') ? null : user_id;

            if(user_id == null || user_name == null || user_ip == null || user_agent == null) return reject(new Error('invalid_parameters'));

            return this.destroy_session(user_id)

            .then((result) =>
            {
                return new ApiSession({
                    id: null,
                    user_id: user_id,
                    user_name: user_name,
                    user_session: Math.random().toString(36).substring(7),
                    user_ip: user_ip,
                    user_agent: user_agent}).save(null, {method: 'insert'});
            })

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_session'));

                return resolve(result.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static validate_session(user_id, user_name, user_session, user_ip, user_agent)
    {
        return new Promise((resolve, reject) =>
        {
            user_id = (user_id == null || user_id == 0 || typeof user_id != 'number') ? null : user_id;
            
            if(user_id == null || user_name == null || user_session == null || user_ip == null || user_agent == null) return reject(new Error('invalid_session'));
            
            return new ApiSession({user_session: user_session}).fetch({
                columns: ['user_id', 'user_name', 'user_session', 'user_ip', 'user_agent']
            })
            
            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_session'));
                
                const session = result.toJSON();
                
                if(session.user_id != user_id || session.user_name != user_name || session.user_ip != user_ip || session.user_agent != user_agent) return this.destroy_session(session.user_id)
                
                .then((result) =>
                {
                    return reject(new Error('invalid_session'));
                });

                return resolve(result.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static destroy_session(user_id)
    {
        user_id = (user_id == null || user_id == 0 || typeof user_id != 'number') ? null : user_id;

        if(user_id == null) return false;

        return new ApiSession().query((qb) => {
            qb.where('user_id', user_id);
        }).fetchAll()

        .then((result) =>
        {
            if(result == null) return false;

            result.forEach((session) =>
            {
                session.destroy();
            });

            return true;
        })

        .catch((err) =>
        {
            return false;
        });
    }
}

export default Session;