import AuthenticationService from './authentication.service';
import SessionService from './session.service';

let servicesModule = angular.module('habboapi.services.authentication', []);

servicesModule.service('AuthenticationService', AuthenticationService);
servicesModule.service('SessionService', SessionService);

export default servicesModule;