import translationEnglish from './translation-en.json';

function Config($locationProvider, $translateProvider, $mdThemingProvider, $urlRouterProvider, $stateProvider, $mdAriaProvider)
{
    'ngInject';
    
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');

    $urlRouterProvider.otherwise('/login');

    $translateProvider.translations('en', translationEnglish);
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.usePostCompiling(true);
    
    $mdThemingProvider.theme('default').primaryPalette('teal');

    $stateProvider.state('not_found', {
        url: '/not_found',
        templateUrl: 'views/not_found.html',
    });

    $stateProvider.state('client', {
        url: '/client',
        sticky: true,
        login_required: true,
        views: {
            client: {
                controller: 'ClientController',
                templateUrl: 'views/client.html'
            }
        }
    });

    $stateProvider.state('client.room', {
        url: '/room/:id',
        sticky: true,
        login_required: true,
        views: {
            client: {
                controller: 'ClientController',
                templateUrl: 'views/client.html'
            }
        }
    });

    $stateProvider.state('community', {
        page_name: 'Community',
        url: '/community',
        templateUrl: 'views/community.html',
        controller: 'CommunityController'
    });

    $stateProvider.state('staff', {
        page_name: 'Staff',
        url: '/staff',
        templateUrl: 'views/staff.html',
        controller: 'StaffController'
    });

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    });

    $stateProvider.state('me', {
        url: '/me',
        templateUrl: 'views/me.html',
        controller: 'MeController',
        login_required: true
    });

    $stateProvider.state('profile', {
        url: '/profile/:username',
        templateUrl: 'views/profile.html',
        controller: 'ProfileController'
    });

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterController'
    });

    $stateProvider.state('room', {
        url: '/room/:id',
        templateUrl: 'views/room.html',
        controller: 'RoomController'
    });

    $stateProvider.state('group', {
        url: '/group/:id',
        templateUrl: 'views/group.html',
        controller: 'GroupController'
    });

    $stateProvider.state('settings', {
        url: '/settings',
        templateUrl: 'views/settings.html',
        controller: 'SettingsController'
    });

    $mdAriaProvider.disableWarnings();
}

export default Config;