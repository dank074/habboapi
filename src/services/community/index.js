import CommunityService from './community.service';
import LeaderboardsService from './leaderboards.service';
import NewsService from './news.service';
import StaffService from './staff.service';
import StatisticsService from './statistics.service';

let communityModule = angular.module('habboapi.services.community', []);

communityModule.service('CommunityService', CommunityService);
communityModule.service('LeaderboardsService', LeaderboardsService);
communityModule.service('NewsService', NewsService);
communityModule.service('StaffService', StaffService);
communityModule.service('StatisticsService', StatisticsService);

export default communityModule;