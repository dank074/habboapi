import BannedController from './banned.controller';
import ClientController from './client.controller';
import CommunityController from './community.controller';
import GroupController from './group.controller';
import LoginController from './login.controller';
import MeController from './me.controller';
import ProfileController from './profile.controller';
import RegisterController from './register.controller';
import RoomController from './room.controller';
import SettingsController from './settings.controller';
import StaffController from './staff.controller';

let controllersModule = angular.module('habboapi.controllers', []);

controllersModule.controller('BannedController', BannedController);
controllersModule.controller('ClientController', ClientController);
controllersModule.controller('CommunityController', CommunityController);
controllersModule.controller('GroupController', GroupController);
controllersModule.controller('LoginController', LoginController);
controllersModule.controller('MeController', MeController);
controllersModule.controller('ProfileController', ProfileController);
controllersModule.controller('RegisterController', RegisterController);
controllersModule.controller('RoomController', RoomController);
controllersModule.controller('SettingsController', SettingsController);
controllersModule.controller('StaffController', StaffController);

export default controllersModule;