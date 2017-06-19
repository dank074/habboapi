import rCRONService from './rcron.service';
import UserService from './user.service';

let servicesModule = angular.module('habboapi.services.user', []);

servicesModule.service('rCRONService', rCRONService);
servicesModule.service('UserService', UserService);

export default servicesModule;