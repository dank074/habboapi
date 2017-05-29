import { Router } from 'express';
import HttpAuthentication from './authentication';
import HttpHotel from './hotel';
import HttpServices from './services';

class MainRouter
{
    constructor()
    {
        let router = Router();

        router.use('/authentication', new HttpAuthentication);
        router.use('/hotel', new HttpHotel);
        router.use('/service', new HttpServices);

        return router;
    }
}

export default MainRouter;