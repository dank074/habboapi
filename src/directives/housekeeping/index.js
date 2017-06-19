import NavigationDirective from './navigation.directive';

let directivesModule = angular.module('habboapi.directives.housekeeping', []);

directivesModule.directive('appHknavigation', () => new NavigationDirective);

export default directivesModule;