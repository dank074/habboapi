import angular from 'angular';
import Authentication from './authentication.service';
import Session from './session.service';
import User from './user.service';
import Utility from './utility.service';

let servicesModule = angular.module('habboapi.services', []);

servicesModule.service('Authentication', Authentication);
servicesModule.service('Session', Session);
servicesModule.service('User', User);
servicesModule.service('Utility', Utility);

export default servicesModule;