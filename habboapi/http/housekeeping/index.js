import { Router } from 'express';
import HttpMiddleware from '../middleware';
import HttpUser from './users';

class HttpHousekeeping
{
    constructor()
    {
        let router = Router();

        router.use('/user', HttpMiddleware.has_permission('hk_users'), new HttpUser);

        return router;
    }
}

export default HttpHousekeeping;