import CommunityController from './community.controller';
import LeaderboardsController from './leaderboards.controller';
import StaffController from './staff.controller';

let communityModule = angular.module('habboapi.controllers.community', []);

communityModule.controller('CommunityController', CommunityController);
communityModule.controller('LeaderboardsController', LeaderboardsController);
communityModule.controller('StaffController', StaffController);

export default communityModule;