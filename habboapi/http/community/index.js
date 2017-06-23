import { Router } from 'express';
import HttpLeaderboards from './leaderboards.http';
import HttpNews from './news.http';
import HttpStaff from './staff.http';
import HttpStatistics from './statistics.http';
import Community from '../../hotel/community/community';

class HttpCommunity
{
    constructor()
    {
        let router = Router();

        router.use('/leaderboards', new HttpLeaderboards);
        router.use('/news', new HttpNews);
        router.use('/staff', new HttpStaff);
        router.use('/statistics', new HttpStatistics);

        router.get('/community_info', this.community_info);

        return router;
    }

    community_info(req, res, next)
    {
        return Community.community_info()

        .then((community_info) =>
        {
            return res.status(200).send({errors: false, error: null, community_info: community_info}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }
}

export default HttpCommunity;