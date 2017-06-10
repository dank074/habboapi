import HKNavigationDirective from './navigation.directive';

let HKDirectivesModule = angular.module('habboapi.directives.housekeeping', []);

HKDirectivesModule.directive('appHknavigation', () => new HKNavigationDirective);

export default HKDirectivesModule;