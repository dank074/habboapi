import CommunityController from './community.controller';
import GroupController from './group.controller';
import LeaderboardsController from './leaderboards.controller';
import RoomController from './room.controller';
import StaffController from './staff.controller';

let controllersModule = angular.module('habboapi.controllers.community', []);

controllersModule.controller('CommunityController', CommunityController);
controllersModule.controller('GroupController', GroupController);
controllersModule.controller('LeaderboardsController', LeaderboardsController);
controllersModule.controller('RoomController', RoomController);
controllersModule.controller('StaffController', StaffController);

export default controllersModule;