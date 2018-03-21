import { Router } from 'express';
import HttpRoutesRoomComments from './comments';
import HttpRoutesRoomInfo from './info';

export default class HttpRoutesRoom
{
    constructor()
    {
        this.router = Router();

        this.router.use('/comments', new HttpRoutesRoomComments);
        
        this.router.post('/info', HttpRoutesRoomInfo);

        return this.router;
    }
}