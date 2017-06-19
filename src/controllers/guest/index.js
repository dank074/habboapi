import LoginController from './login.controller';
import RegisterController from './register.controller';

let controllersModule = angular.module('habboapi.controllers.guest', []);

controllersModule.controller('LoginController', LoginController);
controllersModule.controller('RegisterController', RegisterController);

export default controllersModule;