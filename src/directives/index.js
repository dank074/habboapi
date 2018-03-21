import FollowUserDirective from './followUser';
import LogoutDirective from './logout';
import OpenRoomDirective from './openRoom';
import ValidateUsernameDirective from './validateUsername';
import ValidateEmailDirective from './validateEmail';

let directivesModule = angular.module('habboapi.directives', []);

directivesModule.directive('followUser', () => new FollowUserDirective);
directivesModule.directive('appLogout', () => new LogoutDirective);
directivesModule.directive('openRoom', () => new OpenRoomDirective);
directivesModule.directive('validateUsername', () => new ValidateUsernameDirective);
directivesModule.directive('validateEmail', () => new ValidateEmailDirective);

export default directivesModule;