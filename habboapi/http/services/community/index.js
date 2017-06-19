import { Router } from 'express';
import CommunityHttp from './community.http';
import GroupHttp from './group.http';
import LeaderboardsHttp from './leaderboards.http';
import NewsHttp from './news.http';
import RoomHttp from './room.http';
import StatisticsHttp from './statistics.http';

class HttpServices
{
    constructor()
    {
        let router = Router();

        router.use('/community', new CommunityHttp);
        router.use('/group', new GroupHttp);
        router.use('/leaderboards', new LeaderboardsHttp);
        router.use('/news', new NewsHttp);
        router.use('/room', new RoomHttp);
        router.use('/statistics', new StatisticsHttp);

        return router;
    }
}

export default HttpServices;