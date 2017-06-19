import UtilityService from './utility.service';

let servicesModule = angular.module('habboapi.services.system', []);

servicesModule.service('UtilityService', UtilityService);

export default servicesModule;