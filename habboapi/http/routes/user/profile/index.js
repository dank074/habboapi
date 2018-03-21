import { Router } from 'express';
import HttpRoutesUserProfileComments from './comments';
import HttpRoutesUserProfileInfo from './info';

export default class HttpRoutesUserProfile
{
    constructor()
    {
        this.router = Router();

        this.router.use('/comments', new HttpRoutesUserProfileComments);
        
        this.router.post('/info', HttpRoutesUserProfileInfo);

        return this.router;
    }
}