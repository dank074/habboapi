import { Router } from 'express';
import AnnouncementHttp from './announcement.http';
import CommunityHttp from './community.http';

class HttpServices
{
    constructor()
    {
        let router = Router();

        router.use('/announcement', new AnnouncementHttp);
        router.use('/community', new CommunityHttp);

        return router;
    }
}

export default HttpServices;