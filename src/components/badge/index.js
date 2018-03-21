import BadgeListComponent from './list';

let badgeModule = angular.module('habboapi.components.badge', []);

badgeModule.component('apiBadgeList', BadgeListComponent);

export default badgeModule;