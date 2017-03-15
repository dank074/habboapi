import { Router } from 'express';
import SessionService from '../../services/session.service';

class SessionHttpService
{
    constructor()
    {
        let router = Router();

        router.get('/get_session', this.is_authenticated, this.get_session);
        router.get('/destroy_session', this.is_authenticated, this.destroy_session);

        return router;
    }

    get_session(req, res, next)
    {
        return res.status(200).send({errors: false, error: null, session: req.user}).end();
    }

    destroy_session(req, res, next)
    {
		if(SessionService.destroy_session(req.user.user_id) == false) return res.status(401).send({errors: true, error: 'invalid_session', session: req.user}).end();
		
		req.logout();
        return res.status(200).send({errors: false, error: null, session: null}).end();
    }

    is_authenticated(req, res, next)
    {
        if(req.user == undefined || null) return res.status(400).send({errors: true, error: 'invalid_session'}).end();
        
        return SessionService.validate_session(req.user.user_id, req.user.user_name, req.user.user_session, req.ip, req.headers['user-agent'])
        
        .then((session) =>
        {
            next();
            return null;
        })

        .catch((err) =>
        {
            if(req.isAuthenticated == true) req.logout();

            return res.status(401).send({errors: true, error: err.message, session: null}).end();
        });
    }
}

export default SessionHttpService;