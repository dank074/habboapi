class LoginController
{
    constructor(UtilityService, AuthenticationService, $state, $timeout, $scope)
    {
        'ngInject';
        
        this._UtilityService            = UtilityService;
        this._AuthenticationService     = AuthenticationService;
        this._$state 			        = $state;
        this._$timeout 			        = $timeout;
        this._$scope 			        = $scope;

        this._$scope.login_details = {
            user_name: null,
            user_pass: null
        };

        this._$scope.login = () =>
        {
            return this.login(this._$scope.login_details.user_name, this._$scope.login_details.user_pass);
        };
    }

    login(user_name, user_pass)
    {
        if(user_name == '' || null || user_pass == '' || null) return;

        return this._AuthenticationService.login(this._$scope.login_details.user_name, this._$scope.login_details.user_pass)

        .then((session) =>
        {
            return this._$state.go('me');
        })

        .catch((err) =>
        {
            this._$scope.login_details.user_name = null;
            this._$scope.login_details.user_pass = null;

            if(err.error == 'user_banned') return this._$state.go('banned', {ban: err.ban});

            return this._UtilityService.alert('dialogs.invalid_login');
        });
    }
}

export default LoginController;