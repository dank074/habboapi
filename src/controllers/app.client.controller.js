angular.module('app').controller('ClientController', function(AppConstants, SessionService, $window, $mdDialog, $state, $scope)
{
    $window.HabboFlashClient = {
        started: !1,
        init: function(n)
        {
            console.log('Client loading...');
        }
    };

    $window.addEventListener("load", $window.HabboFlashClient.init(document.getElementById('habbo-client')));

    $window.FlashExternalInterface = {};

    $window.FlashExternalInterface.logout = function()
    {
        $mdDialog.show($mdDialog.confirm({
            title: 'HabboAPI',
            textContent: 'Are you sure you would like to logout?',
            ok: 'Logout',
            cancel: 'Close'
        }))
        
        .then(function resolve()
        {
            SessionService.destroy_session()
            
            .then(function resolve()
            {
                return $state.go('login');
            });
        });
    };

    $window.FlashExternalInterface.disconnect = function()
    {
        $mdDialog.show($mdDialog.alert({
            clickOutsideToClose: false,
            title: 'HabboAPI',
            textContent: 'You have been disconnected!',
            ok: 'Reload'
        }))
        
        .then(function()
        {
            $stickyState.reset('client');
            return $state.reload();
        })
    };

    $window.FlashExternalInterface.openAvatars = function()
    {
        return $state.go('settings');
    };

    $window.FlashExternalInterface.openMinimail = function(n)
    {
        return $state.go('messages');
    };

    $window.FlashExternalInterface.openNews = function()
    {
        return $state.go('news');
    };

    $window.FlashExternalInterface.track = function(n, e, a)
    {
        console.log("action = [" + n + "], label = [" + e + "], value = [" + a + "]");
    };
});