import { Router } from 'express';
import ProfileHttp from './profile.http';
import rCRONHttp from './rcron.http';
import UserHttp from './user.http';

class HttpServices
{
    constructor()
    {
        let router = Router();

        router.use('/profile', new ProfileHttp);
        router.use('/rcron', new rCRONHttp);
        router.use('/user', new UserHttp);

        return router;
    }
}

export default HttpServices;