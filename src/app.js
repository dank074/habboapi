require('angular');
require('angular-animate');
require('angular-aria');
require('angular-messages');
require('angular-material');
require('angular-ui-router');
require('ui-router-extras');
require('ngstorage');
require('./config/app.template-cache');

angular.module('app', [
	'ngAnimate',
	'ngAria',
	'ngMessages',
	'ngMaterial',
	'ui.router',
	'ct.ui.router.extras',
	'ngStorage',
	'app.templates'
]);

angular.module('app').constant('AppConstants', require('./config/app.constants.json').constants);

require('./config/app.config'),
require('./config/app.run');

require('./services/app.authentication.service');
require('./services/app.session.service');
require('./services/app.user.service');
require('./services/app.utility.service');

require('./controllers/app.client.controller');
require('./controllers/app.community.controller');
require('./controllers/app.group.controller');
require('./controllers/app.login.controller');
require('./controllers/app.profile.controller');
require('./controllers/app.register.controller');
require('./controllers/app.room.controller');
require('./controllers/app.settings.controller');
require('./controllers/app.staff.controller');

require('./directives/group/app.group.members.directive');
require('./directives/profile/app.profile.badges.directive');
require('./directives/profile/app.profile.friends.directive');
require('./directives/profile/app.profile.rooms.directive');
require('./directives/profile/app.profile.groups.directive');
require('./directives/app.check-email.directive');
require('./directives/app.check-username.directive');
require('./directives/app.client-room.directive');
require('./directives/app.logout.directive');
require('./directives/app.menu-bar.directive');
require('./directives/app.user-info-card.directive');

require('./filters/app.badge-name.filter');
require('./filters/app.rank-name.filter');

angular.bootstrap(document, ['app'], { strictDi: true });