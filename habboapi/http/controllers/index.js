import { Router } from 'express';
import CommunityHttpController from './community.http.controller';
import GroupHttpController from './group.http.controller';
import ProfileHttpController from './profile.http.controller';
import RoomHttpController from './room.http.controller';

class HttpControllers
{
    constructor()
    {
        let router = Router();

        router.use('/community', new CommunityHttpController);
        router.use('/group', new GroupHttpController);
        router.use('/profile', new ProfileHttpController);
        router.use('/room', new RoomHttpController);

        return router;
    }
}

export default HttpControllers;