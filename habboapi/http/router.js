import { Router } from 'express';
import HttpMiddleware from './middleware';
import HttpAuthentication from './authentication';
import HttpCommunity from './community';
import HttpGroup from './group';
import HttpRoom from './room';
import HttpUser from './user';

class MainRouter
{
    constructor()
    {
        let router = Router();

        router.use('/authentication', new HttpAuthentication);
        router.use('/community', new HttpCommunity);
        router.use('/group', new HttpGroup);
        router.use('/room', new HttpRoom);
        router.use('/user', new HttpUser);

        return router;
    }
}

export default MainRouter;