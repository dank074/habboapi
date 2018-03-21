export default class LogoutDirective
{
    constructor()
    {
        this.restrict   = 'A';
        this.replace    = true;
    }

    controller(Authentication, $localStorage, $translate, $state, $mdDialog, $scope)
    {
        'ngInject';
        
        $scope.Authentication   = Authentication;
        $scope.localStorage     = $localStorage;
        $scope.translate        = $translate,
        $scope.state            = $state;
        $scope.mdDialog         = $mdDialog;
    }

    link(scope, element, attrs)
    {
        element.on('click', (event) =>
        {
            if(scope.localStorage.currentUser == undefined || null) return;

            return scope.translate(['generic.messages.alertTitle', 'generic.messages.userLogout', 'generic.buttons.logout', 'generic.buttons.cancel'])
            
            .then((text) =>
            {
                return scope.mdDialog.show(
                    scope.mdDialog.confirm({
                        title: text['generic.messages.alertTitle'],
                        textContent: text['generic.messages.userLogout'],
                        ok: text['generic.buttons.logout'],
                        cancel: text['generic.buttons.cancel']
                    }));
            })
            
            .then(() =>
            {
                return scope.Authentication.logout();
            })

            .catch(() =>
            {
                return;
            });
        });
    }
}