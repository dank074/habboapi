import { Router } from 'express';
import HttpServices from './services/index';
import HttpControllers from './controllers/index';

class MainRouter
{
    constructor()
    {
        let router = Router();

        router.use('/service', new HttpServices);
        router.use('/controller', new HttpControllers);

        return router;
    }
}

export default MainRouter;