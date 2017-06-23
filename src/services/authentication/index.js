import AuthenticationService from './authentication.service';
import SessionService from './session.service';

let authenticationModule = angular.module('habboapi.services.authentication', []);

authenticationModule.service('AuthenticationService', AuthenticationService);
authenticationModule.service('SessionService', SessionService);

export default authenticationModule;