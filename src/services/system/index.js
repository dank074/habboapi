import UtilityService from './utility.service';

let systemModule = angular.module('habboapi.services.system', []);

systemModule.service('UtilityService', UtilityService);

export default systemModule;