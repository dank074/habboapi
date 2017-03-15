import bcrypt from 'bcrypt-nodejs';
import User from '../database/models/user/user';
import LoginLog from '../database/models/api/login_log';
import SessionService from './session.service';

class AuthenticationService
{
    login(user_name, user_pass, user_ip, user_agent)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_name == null || user_pass == null || user_ip == null || user_agent == null) return reject(new Error('invalid_parameters'));

            return new User({username: user_name}).fetch({
                columns: ['id', 'username', 'password', 'auth_ticket', 'ip_current']
            })

            .then((result) =>
            {
                if(result == null) return this.log_login(0, user_name, user_ip, user_agent, false)
                
                .then((result) =>
                {
                    return reject(new Error('invalid_login'));
                });

                user_info = result.toJSON();
                
                if(bcrypt.compareSync(user_pass, user_info.password) == false) return this.log_login(user_info.id, user_info.username, user_ip, user_agent, false)
                
                .then((result) =>
                {
                    return reject(new Error('invalid_login'));
                });

                return SessionService.create_session(user_info.id, user_info.username, user_ip, user_agent)
                
                .then((session) =>
                {
                    if(session == null) return reject(new Error('invalid_session'));
                    
                    result.set({auth_ticket: session.user_session, ip_current: user_ip})
                    
                    return result.save()

                    .then((result) =>
                    {
                        return this.log_login(user_info.id, user_info.username, user_ip, user_agent, false)

                        .then((result) =>
                        {
                            return resolve(session);
                        })
                    })
                })

                .catch((err) =>
                {
                    return reject(err);
                });
            })

            .catch((err) =>
            {
                return reject(err);
            })
        });
    }

    log_login(user_id, user_name, user_ip, user_agent, login_status)
    {
        return new Promise((resolve, reject) =>
        {
            user_id         = (user_id == null || typeof user_id != 'number') ? '0' : user_id;
			login_status    = (login_status == false) ? '0' : '1';
			
			if(user_id == null || user_name == null || user_ip == null || user_agent == null || login_status == null) return reject(new Error('invalid_parameters'));
			
			return new LoginLog({
            	id: null,
            	user_id: user_id,
            	user_name: user_name,
            	user_ip: user_ip,
            	user_agent: user_agent,
            	login_status: login_status}).save(null, {method: 'insert'})
			
			.then((result) =>
			{
				if(result == null) return reject(new Error('log_error'));
				
				return resolve(null);
			})

			.catch((err) =>
			{
				return reject(err);
			});
		});
    }
}

export default AuthenticationService;