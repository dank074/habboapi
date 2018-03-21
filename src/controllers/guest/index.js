import GuestBannedController from './banned';
import GuestLoginController from './login';
import GuestRegisterController from './register';

let guestModule = angular.module('habboapi.controllers.guest', []);

guestModule.controller('GuestBannedController', GuestBannedController);
guestModule.controller('GuestLoginController', GuestLoginController);
guestModule.controller('GuestRegisterController', GuestRegisterController);

export default guestModule;