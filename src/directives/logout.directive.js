class Logout
{
    constructor()
    {
        this.restrict   = 'A';
        this.replace    = true;
    }

    controller(SessionService, $localStorage, $translate, $state, $mdDialog, $scope)
    {
        'ngInject';
        
        $scope.SessionService   = SessionService;
        $scope.localStorage     = $localStorage;
        $scope.translate        = $translate,
        $scope.state            = $state;
        $scope.mdDialog         = $mdDialog;
    }

    link(scope, element, attrs)
    {
        element.on('click', (event) =>
        {
            if(scope.localStorage.current_user == undefined || null) return;

            return scope.translate(['dialogs.title', 'dialogs.logout', 'dialogs.ok_logout', 'dialogs.cancel'])
            
            .then((text) =>
            {
                return scope.mdDialog.show(
                    scope.mdDialog.confirm({
                        title: text['dialogs.title'],
                        textContent: text['dialogs.logout'],
                        ok: text['dialogs.ok_logout'],
                        cancel: text['dialogs.cancel']
                    }));
            })
            
            .then(() =>
            {
                return scope.SessionService.destroy_session();
            })

            .then(() =>
            {
                return scope.state.go('login');
            })

            .catch(() =>
            {
                return;
            });
        });
    }
}

export default Logout;