import { Router } from 'express';
import AuthenticationHttpService from './authentication.http.service';
import SessionHttpService from './session.http.service';
import UserHttpService from './user.http.service';

class HttpServices
{
    constructor()
    {
        let router = Router();

        router.use('/authentication', new AuthenticationHttpService);
        router.use('/session', new SessionHttpService);
        router.use('/user', new UserHttpService);

        return router;
    }
}

export default HttpServices;