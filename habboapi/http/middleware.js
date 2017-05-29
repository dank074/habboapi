import Session from '../authentication/session';
import Permission from '../authentication/permission';

class HttpMiddleware
{
    static is_authenticated(req, res, next)
    {
        if(req.user == undefined || null) return res.status(400).send({errors: true, error: 'invalid_session'}).end();
        
        return Session.validate_session(req.user.user_id, req.user.user_name, req.user.user_session, req.ip, req.headers['user-agent'])
        
        .then((session) =>
        {
            return next();
        })

        .catch((err) =>
        {
            if(req.isAuthenticated == true) req.logout();

            return res.status(401).send({errors: true, error: err.message, session: null}).end();
        });
    }

    static has_permission(permission)
    {
        return (req, res, next) =>
        {
            if(req.user == undefined || null) return res.status(400).send({errors: true, error: 'invalid_session'}).end();
            
            return Permission.has_permission(req.user.user_info.rank, permission)

            .then(() =>
            {
                return next();
            })

            .catch((err) =>
            {
                return res.status(401).send({errors: true, error: err.message}).end();
            })
        }
    }
}

export default HttpMiddleware