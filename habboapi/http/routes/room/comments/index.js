import { Router } from 'express';
import HttpMiddleware from '../../../middleware';
import HttpRoutesRoomCommentsAdd from './add';
import HttpRoutesRoomCommentsList from './list';

export default class HttpRoutesRoomComments
{
    constructor()
    {
        this.router = Router();

        this.router.post('/add', HttpMiddleware.isAuthenticated, HttpRoutesRoomCommentsAdd);
        this.router.post('/list', HttpRoutesRoomCommentsList);

        return this.router;
    }
}