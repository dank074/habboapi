import { Router } from 'express';
import HttpMiddleware from './middleware';
import HttpRoutes from './routes';

export default class HttpRouter
{
    constructor()
    {
        this.router = Router();

        this.router.use(HttpMiddleware.checkMaintenance);
        this.router.use(HttpMiddleware.checkIpBan);

        this.router.use('/api', new HttpRoutes, (req, res, next) =>
        {
            res.locals.status   = (res.locals.status == undefined || null) ? 200 : res.locals.status;
            res.locals.errors   = (res.locals.errors == undefined || null) ? false : res.locals.errors;
            res.locals.error    = (res.locals.error == undefined || null) ? null : res.locals.error;
            res.locals.session  = req.user;

            return res.status(res.locals.status).send(res.locals).end();
        });

        this.router.use((req, res, next) =>
        {
            return res.status(200).render(__base + '/src/views/index.html', {siteName: __config.webSettings.siteName});
        });

        return this.router;
    }
}