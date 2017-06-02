import { Router } from 'express';
import GroupHttp from './group.http';
import ProfileHttp from './profile.http';
import rCRONHttp from './rcron.http';
import RoomHttp from './room.http';
import StatisticsHttp from './statistics.http';
import UserHttp from './user.http';

class HttpHotel
{
    constructor()
    {
        let router = Router();

        router.use('/group', new GroupHttp)
        router.use('/profile', new ProfileHttp);
        router.use('/rcron', new rCRONHttp);
        router.use('/room', new RoomHttp);
        router.use('/statistics', new StatisticsHttp);
        router.use('/user', new UserHttp);

        return router;
    }
}

export default HttpHotel;