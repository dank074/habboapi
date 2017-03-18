import SessionService from '../services/session.service';

class HttpMiddleware
{
    static is_authenticated(req, res, next)
    {
        if(req.user == undefined || null) return res.status(400).send({errors: true, error: 'invalid_session'}).end();
        
        return SessionService.validate_session(req.user.user_id, req.user.user_name, req.user.user_session, req.ip, req.headers['user-agent'])
        
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
}

export default HttpMiddleware