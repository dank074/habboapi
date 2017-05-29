class RegisterController
{
    constructor(UtilityService, AuthenticationService, UserService, $state, $timeout, $scope)
    {
        'ngInject';
        
        this._UtilityService            = UtilityService;
        this._AuthenticationService     = AuthenticationService;
        this._UserService               = UserService;
        this._$state 			        = $state;
        this._$timeout 			        = $timeout;
        this._$scope 			        = $scope;

        this._$scope.register_details = {
            user_name: null,
            user_email: null,
            user_pass: null,
            user_cpass: null
        };

        this._$scope.register = () =>
        {
            return this.register(this._$scope.register_details.user_name, this._$scope.register_details.user_email, this._$scope.register_details.user_pass);
        };
    }

    register(user_name, user_email, user_pass)
    {
        if(user_name == '' || null || user_email == '' || null || user_pass == '' || null) return;
        
        return this._UserService.add_user(user_name, user_email, user_pass)
        
        .then((user) =>
        {
            return this._AuthenticationService.login(user_name, user_pass)
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

export default RegisterController;