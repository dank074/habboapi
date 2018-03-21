import { Router } from 'express';
import HttpRoutesCommunityInfo from './info';
import HttpRoutesCommunityLeaderboards from './leaderboards';
import HttpRoutesCommunityStaff from './staff';
import HttpRoutesCommunityUsersOnline from './usersOnline';

export default class HttpRoutesCommunity
{
    constructor()
    {
        this.router = Router();

        this.router.get('/info', HttpRoutesCommunityInfo);
        this.router.get('/leaderboards', HttpRoutesCommunityLeaderboards);
        this.router.get('/staff', HttpRoutesCommunityStaff);
        this.router.get('/usersOnline', HttpRoutesCommunityUsersOnline);

        return this.router;
    }
}