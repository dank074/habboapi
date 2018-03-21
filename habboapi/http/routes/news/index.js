import { Router } from 'express';
import HttpRoutesNewsComments from './comments';
import HttpRoutesNewsInfo from './info';
import HttpRoutesNewsList from './list';

export default class HttpRoutesNews
{
    constructor()
    {
        this.router = Router();

        this.router.use('/comments', new HttpRoutesNewsComments);

        this.router.post('/info', HttpRoutesNewsInfo);
        this.router.post('/list', HttpRoutesNewsList);

        return this.router;
    }
}