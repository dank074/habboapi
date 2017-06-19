import { Router } from 'express';
import AuthenticationHttp from './authentication';
import CommunityHttp from './community';
import UserHttp from './user';

class HttpServices
{
    constructor()
    {
        let router = Router();

        router.use('/authentication', new AuthenticationHttp);
        router.use('/community', new CommunityHttp);
        router.use('/user', new UserHttp);

        return router;
    }
}

export default HttpServices;