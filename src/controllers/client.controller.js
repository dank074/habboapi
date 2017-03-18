import angular from 'angular';

class Client
{
    constructor(AppConstants, Session, $localStorage, $window, $stickyState, $mdDialog, $state, $scope)
    {
        'ngInject';

        this._AppConstants = AppConstants;
        this._Session = Session;
        this._$localStorage = $localStorage;
        this._$window = $window;
        this._$stickyState = $stickyState;
        this._$mdDialog = $mdDialog;
        this._$state = $state;
        this._$scope = $scope;

        this._$scope.client_swf = this._AppConstants.client.client_swf;
        this._$scope.client_base = this._AppConstants.client.client_base;

        this._$scope.flashvars_string = '';

        this._$scope.flash_vars = {
            "connection.info.host": this._AppConstants.client.client_host,
            "connection.info.port": this._AppConstants.client.client_port,
            "external.texts.txt": this._AppConstants.client.client_texts,
            "external.variables.txt": this._AppConstants.client.client_vars,
            "external.figurepartlist.txt": this._AppConstants.client.client_figurelist,
            "furnidata.load.url": this._AppConstants.client.client_furnidata,
            "productdata.load.url": this._AppConstants.client.client_productdata,
            "avatareditor.promohabbos": this._AppConstants.client.client_promohabbos,
            "client.allow.cross.domain": 1,
            "client.notify.cross.domain": 0,
            "client.starting": "Loading " + this._AppConstants.site_name,
            "client.starting.revolving": "We all live in igloos./For science, you monster/Loading funny message... please wait./Would you like fries with that?/Follow the yellow duck./Time is just an illusion./Are we there yet?!/I like your t-shirt./Look left. Look right. Blink twice. Ta da!/It's not you, it's me./Shhh! I'm trying to think here./Loading pixel universe.",
            "flash.client.url": this._AppConstants.client.client_base,
            "flash.client.origin": "popup",
            "url.prefix": this._AppConstants.site_link + '/',
            "processlog.enabled": 1,
            "has.identity": 1,
            "spaweb": 1,
            "sso.ticket": this._$localStorage.current_user.user_session,
            "account_id": this._$localStorage.current_user.user_id,
            "unique_habbo_id": this._$localStorage.current_user.user_session
        };

        angular.forEach(this._$scope.flash_vars, (value, key) =>
		{
            this._$scope.flashvars_string += key + '=' + value + '&amp;';
		});

        this._$window.HabboFlashClient = {
            started: !1,
            init: function(n)
            {
                console.log('[HABBOAPI] Client Loading');
            }
        };

        this._$window.addEventListener("load", this._$window.HabboFlashClient.init(document.getElementById('flash-container')));

        this._$window.FlashExternalInterface = {};

        this._$window.FlashExternalInterface.logout = () =>
        {
            this._$mdDialog.show(
                this._$mdDialog.confirm({
                    title: 'HabboAPI',
                    textContent: 'Are you sure you would like to logout?',
                    ok: 'Logout',
                    cancel: 'Close'
                })
            )
            
            .then(() =>
            {
                this._Session.destroy_session()
                
                .then(() =>
                {
                    return this._$state.go('login');
                });
            })

            .catch(() =>
            {
                return;
            });
        };
        
        this._$window.FlashExternalInterface.disconnect = () =>
        {
            this._$mdDialog.show(
                this._$mdDialog.alert({
                    clickOutsideToClose: false,
                    title: 'HabboAPI',
                    textContent: 'You have been disconnected!',
                    ok: 'Reload'
                })
            )
            
            .then(() =>
            {
                this._$stickyState.reset('client');
                return this._$state.reload();
            });
        };
        
        this._$window.FlashExternalInterface.openAvatars = () =>
        {
            return this._$state.go('settings');
        };
        
        this._$window.FlashExternalInterface.openMinimail = () =>
        {
            return this._$state.go('messages');
        };
        
        this._$window.FlashExternalInterface.openNews = () =>
        {
            return this._$state.go('news');
        };
        
        this._$window.FlashExternalInterface.track = (action, label, value) =>
        {
            console.log('action = [' + action + '], label = [' + label + '], value = [' + value + ']');
        };
    }
}

export default Client;