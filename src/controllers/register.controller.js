class Register
{
    constructor(Utility, User, Authentication, $state, $scope)
    {
        'ngInject';
        
        this._Utility = Utility;
        this._User = User;
        this._Authentication = Authentication;
        this._$state = $state;
        this._$scope = $scope;

        this._$scope.register_details = {
            user_name: null,
            user_email: null,
            user_pass: null,
            user_cpass: null
        };

        this._$scope.register = () =>
        {
            if(this._$scope.register_details == undefined || this._$scope.register_details.length == 0) return this._Utility.alert('Something is missing, please try again.');

            return User.add_user(this._$scope.register_details.user_name, this._$scope.register_details.user_email, this._$scope.register_details.user_pass)

            .then((user) =>
            {
                this._Utility.alert('Account Created! You may now login.');
                return this._$state.go('login', {login_username: $scope.register_details.user_name});
            })

            .catch((err) =>
            {
                return Utility.alert('Something went wrong, please try again.');
            });
        }
    }
}

export default Register;