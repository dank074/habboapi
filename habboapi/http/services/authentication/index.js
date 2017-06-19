import { Router } from 'express';
import AuthenticationHttp from './authentication.http';
import SessionHttp from './session.http';

class HttpAuthentication
{
    constructor()
    {
        let router = Router();

        router.use('/authenticate', new AuthenticationHttp);
        router.use('/session', new SessionHttp);

        return router;
    }
}

export default HttpAuthentication;