import { Router } from 'express';
import HttpMiddleware from './middleware';
import HttpHousekeeping from './housekeeping';
import HttpServices from './services';

class MainRouter
{
    constructor()
    {
        let router = Router();

        router.use('/housekeeping', HttpMiddleware.is_authenticated, HttpMiddleware.has_permission('hk_login'), new HttpHousekeeping);
        router.use('/services', new HttpServices);

        return router;
    }
}

export default MainRouter;