import { Router } from 'express';
import HttpMiddleware from '../middleware';
import HttpRoutesAuthentication from './authentication';
import HttpRoutesCommunity from './community';
import HttpRoutesGroup from './group';
import HttpRoutesNews from './news';
import HttpRoutesrCRON from './rcron';
import HttpRoutesRoom from './room';
import HttpRoutesUser from './user';

export default class HttpRoutes
{
    constructor()
    {
        this.router = Router();

        this.router.use('/authentication', new HttpRoutesAuthentication);

        this.router.use(HttpMiddleware.loadUser);
        this.router.use(HttpMiddleware.checkBan);

        this.router.use('/community', new HttpRoutesCommunity);
        this.router.use('/group', new HttpRoutesGroup);
        this.router.use('/news', new HttpRoutesNews);
        this.router.use('/rcron', HttpMiddleware.isAuthenticated, new HttpRoutesrCRON);
        this.router.use('/room', new HttpRoutesRoom);
        this.router.use('/user', new HttpRoutesUser);

        return this.router;
    }
}