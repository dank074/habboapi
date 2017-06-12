import { Router } from 'express';
import HttpMiddleware from './middleware';
import HttpAuthentication from './authentication';
import HttpHotel from './hotel';
import HttpHousekeeping from './housekeeping';
import HttpServices from './services';

class MainRouter
{
    constructor()
    {
        let router = Router();

        router.use('/authentication', new HttpAuthentication);
        router.use('/hotel', new HttpHotel);
        router.use('/housekeeping', HttpMiddleware.is_authenticated, HttpMiddleware.has_permission('hk_login'), new HttpHousekeeping);
        router.use('/service', new HttpServices);

        return router;
    }
}

export default MainRouter;