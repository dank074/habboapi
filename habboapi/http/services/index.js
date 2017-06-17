import { Router } from 'express';
import AnnouncementHttp from './announcement.http';
import CommunityHttp from './community.http';
import NewsHttp from './news.http';

class HttpServices
{
    constructor()
    {
        let router = Router();

        router.use('/announcement', new AnnouncementHttp);
        router.use('/community', new CommunityHttp);
        router.use('/news', new NewsHttp);

        return router;
    }
}

export default HttpServices;