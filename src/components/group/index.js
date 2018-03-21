import GroupCardComponent from './card';
import GroupListComponent from './list';

let groupModule = angular.module('habboapi.components.group', []);

groupModule.component('apiGroupCard', GroupCardComponent);
groupModule.component('apiGroupList', GroupListComponent);

export default groupModule;