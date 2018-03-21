import { Router } from 'express';
import HttpRoutesrCRONFriendRequest from './friendRequest';
import HttpRoutesrCRONStalkUser from './stalkUser';

export default class HttpRoutesUser
{
    constructor()
    {
        this.router = Router();

        this.router.post('/friendRequest', HttpRoutesrCRONFriendRequest);
        this.router.post('/stalkUser', HttpRoutesrCRONStalkUser);
        
        return this.router;
    }
}