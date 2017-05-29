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
        name: 'not_found',
        page_name: 'Not found',
        url: '/not_found',
        templateUrl: 'views/not_found.html',
    });

    $stateProvider.state('client', {
        name: 'client',
        page_name: 'Client',
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

    $stateProvider.state('community', {
        name: 'community',
        page_name: 'Community',
        url: '/community',
        templateUrl: 'views/community.html',
        controller: 'CommunityController'
    });

    $stateProvider.state('staff', {
        name: 'staff',
        page_name: 'Staff',
        url: '/staff',
        templateUrl: 'views/staff.html',
        controller: 'StaffController'
    });

    $stateProvider.state('login', {
        name: 'login',
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    });

    $stateProvider.state('me', {
        name: 'me',
        page_name: 'Me',
        url: '/me',
        templateUrl: 'views/me.html',
        controller: 'MeController',
        login_required: true
    });

    $stateProvider.state('profile', {
        name: 'profile',
        url: '/profile/:username',
        templateUrl: 'views/profile.html',
        controller: 'ProfileController'
    });

    $stateProvider.state('register', {
        name: 'register',
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterController'
    });

    $stateProvider.state('room', {
        name: 'room',
        url: '/room/:id',
        templateUrl: 'views/room.html',
        controller: 'RoomController'
    });

    $stateProvider.state('group', {
        name: 'group',
        url: '/group/:id',
        templateUrl: 'views/group.html',
        controller: 'GroupController'
    });

    $stateProvider.state('settings', {
        name: 'settings',
        url: '/settings',
        templateUrl: 'views/settings.html',
        controller: 'SettingsController'
    });

    $mdAriaProvider.disableWarnings();
}

export default Config;