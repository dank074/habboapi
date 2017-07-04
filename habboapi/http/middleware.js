import User from '../hotel/user/user';
import Session from '../hotel/authentication/session';

class HttpMiddleware
{
    static is_authenticated(req, res, next)
    {
        if(req.user == undefined || null) return res.status(400).send({errors: true, error: 'invalid_session'}).end();
        
        return Session.validate_session(req.user.user_id, req.user.user_name, req.user.user_session, req.ip, req.headers['user-agent'])
        
        .then((session) =>
        {
            return User.check_ban(req.user.user_id)
            
            .then((ban) =>
            {
                Session.destroy_session(req.user.user_id);
                
                req.logout();
                return res.status(401).send({errors: true, error: 'user_banned', ban: ban}).end();
            })
            
            .catch((err) =>
            {
                return next();
            });
        })

        .catch((err) =>
        {
            if(req.isAuthenticated == true) req.logout();

            return res.status(401).send({errors: true, error: err.message, session: null}).end();
        });
    }
}

export default HttpMiddleware;