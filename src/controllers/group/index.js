import GroupController from './group.controller';

let groupModule = angular.module('habboapi.controllers.group', []);

groupModule.controller('GroupController', GroupController);

export default groupModule;