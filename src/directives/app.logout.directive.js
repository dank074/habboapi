angular.module('app').directive('appLogout', function(SessionService, $state, $localStorage, $mdDialog)
{
    return {
		restrict: 'A',
		replace: true,
        link: function(scope, element, attrs, ngModel)
        {
            element.on('click', function(event)
			{
                if($localStorage.current_user == undefined || null) return;

                $mdDialog.show($mdDialog.confirm({
					title: 'HabboAPI',
					textContent: 'Are you sure you would like to logout?',
					ok: 'Logout',
					cancel: 'Close'
				}))
                
                .then(function()
                {
                    SessionService.destroy_session()

                    .then(function()
                    {
                        event.preventDefault();
                        return $state.go('login');
                    });
				});
            });
        }
	}
});