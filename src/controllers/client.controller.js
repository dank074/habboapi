class ClientController
{
    constructor(AppConstants, SessionService, $translate, $localStorage, $window, $stickyState, $mdDialog, $state, $rootScope, $scope)
    {
        'ngInject';

        this._AppConstants      = AppConstants;
        this._SessionService    = SessionService;
        this._$translate        = $translate;
        this._$localStorage     = $localStorage;
        this._$window           = $window;
        this._$stickyState      = $stickyState;
        this._$mdDialog         = $mdDialog;
        this._$state            = $state;
        this._$rootScope        = $rootScope;
        this._$scope            = $scope;

        this._$scope.flashvars_string   = '';

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
            "client.starting": this._AppConstants.site_name,
            "client.starting.revolving": this._$translate.instant('client.revolving'),
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

        this._$scope.go_back = () =>
        {
            if(this._$rootScope.previous_state.name == 'client') return this._$state.go('login');

            return this._$state.go(this._$rootScope.previous_state.name, this._$rootScope.previous_params);
        }

        this._$scope.reload_client = () =>
        {
            this._$stickyState.reset('client');
        }

        this._$window.HabboFlashClient = {
            started: !1,
            init: () =>
            {
                setTimeout(() =>
                {
                    this._$window.HabboFlashClient.flashInterface = document.getElementById('flash-container');
                }, 1000);
            }
        };

        this._$window.addEventListener("load", this._$window.HabboFlashClient.init());

        this._$window.FlashExternalInterface = {};

        this._$window.FlashExternalInterface.logout = () =>
        {
            return this._$translate(['dialogs.title', 'dialogs.logout', 'dialogs.ok_logout', 'dialogs.cancel'])
            
            .then((text) =>
            {
                return this._$mdDialog.show(
                    this._$mdDialog.confirm({
                        title: text['dialogs.title'],
                        textContent: text['dialogs.logout'],
                        ok: text['dialogs.ok_logout'],
                        cancel: text['dialogs.cancel']
                    }));
            })
            
            .then(() =>
            {
                return this._SessionService.destroy_session();
            })

            .then(() =>
            {
                return this._$state.go('login');
            })

            .catch(() =>
            {
                return;
            })
        };
        
        this._$window.FlashExternalInterface.disconnect = () =>
        {
            return this._$translate(['dialogs.title', 'dialogs.disconnected', 'dialogs.ok_reload', 'dialogs.close'])
            
            .then((text) =>
            {
                return this._$mdDialog.show(
                    this._$mdDialog.alert({
                        clickOutsideToClose: false,
                        title: text['dialogs.title'],
                        textContent: text['dialogs.disconnected'],
                        ok: text['dialogs.ok_reload']
                    }));
            })

            .then(() =>
            {
                this._$stickyState.reset('client');

                if(this._$state.includes('client')) return this._$state.reload();

                return this._$state.go('client');
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

export default ClientController;