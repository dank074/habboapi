import LoginController from './login.controller';
import RegisterController from './register.controller';

let guestModule = angular.module('habboapi.controllers.guest', []);

guestModule.controller('LoginController', LoginController);
guestModule.controller('RegisterController', RegisterController);

export default guestModule;