class Logout
{
    constructor()
    {
        this.restrict = 'A';
        this.replace = true;
    }

    controller(Session, $localStorage, $state, $mdDialog, $scope)
    {
        'ngInject';
        
        $scope.service          = Session;
        $scope.localStorage     = $localStorage;
        $scope.state            = $state;
        $scope.mdDialog         = $mdDialog;
    }

    link(scope, element, attrs)
    {
        element.on('click', (event) =>
        {
            if(scope.localStorage.current_user == undefined || null) return;

            scope.mdDialog.show(
                scope.mdDialog.confirm({
                    title: 'HabboAPI',
                            textContent: 'Are you sure you would like to logout?',
                            ok: 'Logout',
                            cancel: 'Close'
                })
            )
            
            .then(() =>
            {
                scope.service.destroy_session()
                
                .then(() =>
                {
                    event.preventDefault();
                    return scope.state.go('login');
                });
            })

            .catch(() =>
            {
                return;
            });
        });
    }
}

export default Logout;