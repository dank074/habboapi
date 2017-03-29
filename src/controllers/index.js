import angular from 'angular';
import ClientController from './client.controller';
import CommunityController from './community.controller';
import GroupController from './group.controller';
import LoginController from './login.controller';
import ProfileController from './profile.controller';
import RegisterController from './register.controller';
import RoomController from './room.controller';
import SettingsController from './settings.controller';
import StaffController from './staff.controller';

let controllers = angular.module('habboapi.controllers', []);

controllers.controller('ClientController', ClientController);
controllers.controller('CommunityController', CommunityController);
controllers.controller('GroupController', GroupController);
controllers.controller('LoginController', LoginController);
controllers.controller('ProfileController', ProfileController);
controllers.controller('RegisterController', RegisterController);
controllers.controller('RoomController', RoomController);
controllers.controller('SettingsController', SettingsController);
controllers.controller('StaffController', StaffController);

export default controllers;