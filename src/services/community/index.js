import CommunityService from './community.service';
import LeaderboardsService from './leaderboards.service';
import NewsService from './news.service';
import StatisticsService from './statistics.service';

let servicesModule = angular.module('habboapi.services.community', []);

servicesModule.service('CommunityService', CommunityService);
servicesModule.service('LeaderboardsService', LeaderboardsService);
servicesModule.service('NewsService', NewsService);
servicesModule.service('StatisticsService', StatisticsService);

export default servicesModule;