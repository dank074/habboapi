import angular from 'angular';

class Client
{
    constructor(AppConstants, Session, $window, $stickyState, $mdDialog, $state, $scope)
    {
        'ngInject';

        this._AppConstants = AppConstants;
        this._Session = Session;
        this._$window = $window;
        this._$stickyState = $stickyState;
        this._$mdDialog = $mdDialog;
        this._$state = $state;
        this._$scope = $scope;

        this._$window.HabboFlashClient = {
            started: !1,
            init: function(n)
            {
                console.log('[HABBOAPI] Client Loading');
            }
        };

        this._$window.addEventListener("load", this._$window.HabboFlashClient.init(document.getElementById('habbo-client')));

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