import 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
import 'angular-material';
import 'angular-translate';
import 'angular-ui-router';
import 'ui-router-extras';
import 'ngstorage';

import Constants from './config/constants.json';
import Config from './config/config';
import Run from './config/run';

import './services';
import './controllers';
import './directives';
import './config/template-cache';

const requires = [
	'ngAnimate',
	'ngAria',
	'ngMessages',
	'ngMaterial',
	'pascalprecht.translate',
	'ui.router',
	'ct.ui.router.extras',
	'ngStorage',
	'app.templates',
	'habboapi.services',
	'habboapi.controllers',
	'habboapi.directives'
];

window.app = angular.module('app', requires);

angular.module('app').constant('AppConstants', Constants.constants);
angular.module('app').config(Config);
angular.module('app').run(Run);

angular.bootstrap(document, ['app'], { strictDi: true });