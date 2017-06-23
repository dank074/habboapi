import GroupService from './group.service';

let groupModule = angular.module('habboapi.services.group', []);

groupModule.service('GroupService', GroupService);

export default groupModule;