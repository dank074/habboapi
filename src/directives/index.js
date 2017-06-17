import ClientDirective from './client.directive';
import LogoutDirective from './logout.directive';
import NavigationDirective from './navigation.directive';
import ValidateUsernameDirective from './validate_username.directive';
import ValidateEmailDirective from './validate_email.directive';

let directivesModule = angular.module('habboapi.directives', []);

directivesModule.directive('habboClient', () => new ClientDirective);
directivesModule.directive('appLogout', () => new LogoutDirective);
directivesModule.directive('appNavigation', () => new NavigationDirective);
directivesModule.directive('validateUsername', () => new ValidateUsernameDirective);
directivesModule.directive('validateEmail', () => new ValidateEmailDirective);

export default directivesModule;