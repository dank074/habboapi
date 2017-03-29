import angular from 'angular';
import AuthenticationService from './authentication.service';
import SessionService from './session.service';
import UserService from './user.service';
import UtilityService from './utility.service';

let servicesModule = angular.module('habboapi.services', []);

servicesModule.service('AuthenticationService', AuthenticationService);
servicesModule.service('SessionService', SessionService);
servicesModule.service('UserService', UserService);
servicesModule.service('UtilityService', UtilityService);

export default servicesModule;