import AuthenticationService from './authentication.service';
import rCRONService from './rcron.service';
import SessionService from './session.service';
import StatisticsService from './statistics.service';
import UserService from './user.service';
import UtilityService from './utility.service';

let servicesModule = angular.module('habboapi.services', []);

servicesModule.service('AuthenticationService', AuthenticationService);
servicesModule.service('rCRONService', rCRONService);
servicesModule.service('SessionService', SessionService);
servicesModule.service('StatisticsService', StatisticsService);
servicesModule.service('UserService', UserService);
servicesModule.service('UtilityService', UtilityService);

export default servicesModule;