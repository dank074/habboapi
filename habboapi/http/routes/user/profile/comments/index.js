import { Router } from 'express';
import HttpRoutesUseProfileCommentsAdd from './add';
import HttpRoutesUserProfileCommentsList from './list';
import HttpMiddleware from '../../../../middleware';

export default class HttpRoutesUserProfileComments
{
    constructor()
    {
        this.router = Router();

        this.router.post('/add', HttpMiddleware.isAuthenticated, HttpRoutesUseProfileCommentsAdd);
        this.router.post('/list', HttpRoutesUserProfileCommentsList);

        return this.router;
    }
}