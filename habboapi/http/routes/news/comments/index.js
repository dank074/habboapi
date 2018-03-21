import { Router } from 'express';
import HttpMiddleware from '../../../middleware';
import HttpRoutesNewsCommentsAdd from './add';
import HttpRoutesNewsCommentsList from './list';

export default class HttpRoutesNewsComments
{
    constructor()
    {
        this.router = Router();

        this.router.post('/add', HttpMiddleware.isAuthenticated, HttpRoutesNewsCommentsAdd);
        this.router.post('/list', HttpRoutesNewsCommentsList);

        return this.router;
    }
}