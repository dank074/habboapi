import { Router } from 'express';
import HttpMiddleware from '../middleware';
import Session from '../../authentication/session';

class SessionHttp
{
    constructor()
    {
        let router = Router();

        router.get('/get_session', HttpMiddleware.is_authenticated, this.get_session);
        router.get('/destroy_session', HttpMiddleware.is_authenticated, this.destroy_session);

        return router;
    }

    get_session(req, res, next)
    {
        return res.status(200).send({errors: false, error: null, session: req.user}).end();
    }

    destroy_session(req, res, next)
    {
        if(Session.destroy_session(req.user.user_id) == false) return res.status(401).send({errors: true, error: 'invalid_session', session: req.user}).end();
        
        req.logout();
        return res.status(200).send({errors: false, error: null, session: null}).end();
    }
}

export default SessionHttp;