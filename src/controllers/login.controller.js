class Login
{
	constructor(Utility, Authentication, $state, $scope)
	{
		'ngInject';
		
		this._Utility = Utility;
		this._Authentication = Authentication;
		this._$state = $state;
		this._$scope = $scope;

		this._$scope.login_details = {
			user_name: null,
			user_pass: null
		};

		this._$scope.login = () =>
		{
			if(this._$scope.login_details.user_name == undefined || null || this._$scope.login_details.user_pass == undefined || null) return;

			return this._Authentication.login(this._$scope.login_details.user_name, this._$scope.login_details.user_pass)

			.then((session) =>
			{
				return this._$state.go('me');
			})

			.catch((err) =>
			{
				this._$scope.login_details.user_name, this._$scope.login_details.user_pass = null;

				return this._Utility.alert('dialogs.invalid_login');
			});
		}
	}
}

export default Login;