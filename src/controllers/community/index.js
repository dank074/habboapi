import CommunityHomeController from './home';
import CommunityLeaderboardsController from './leaderboards';
import CommunityStaffController from './staff';

let communityModule = angular.module('habboapi.controllers.community', []);

communityModule.controller('CommunityHomeController', CommunityHomeController);
communityModule.controller('CommunityLeaderboardsController', CommunityLeaderboardsController);
communityModule.controller('CommunityStaffController', CommunityStaffController);

export default communityModule;