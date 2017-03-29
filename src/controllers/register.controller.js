class RegisterController
{
    constructor(UtilityService, UserService, AuthenticationService, $state, $scope)
    {
        'ngInject';
        
        this._UtilityService        = UtilityService;
        this._UserService           = UserService;
        this._AuthenticationService = AuthenticationService;
        this._$state                = $state;
        this._$scope                = $scope;

        this._$scope.register_details = {
            user_name: null,
            user_email: null,
            user_pass: null,
            user_cpass: null
        };

        this._$scope.register = () =>
        {
            if(this._$scope.register_details.user_name == null || this._$scope.register_details.user_email == null || this._$scope.register_details.user_pass == null || this._$scope.register_details.user_cpass == null) return;

            return UserService.add_user(this._$scope.register_details.user_name, this._$scope.register_details.user_email, this._$scope.register_details.user_pass)

            .then((user) =>
            {
                return this._AuthenticationService.login(this._$scope.register_details.user_name, this._$scope.register_details.user_pass)
            })

            .then((session) =>
            {
                return this._$state.go('me');
            })

            .catch((err) =>
            {
                return this._UtilityService.alert('dialogs.something_wrong');
            });
        }
    }
}

export default RegisterController;