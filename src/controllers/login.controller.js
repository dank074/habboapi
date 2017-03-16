class Login
{
	constructor(Utility, Authentication, $stateParams, $state, $scope)
	{
		'ngInject';
		
		this._Utility = Utility;
		this._Authentication = Authentication;
		this._$stateParams = $stateParams;
		this._$state = $state;
		this._$scope = $scope;

		this._$scope.login_details = {
			user_name: (this._$stateParams.login_username == undefined || null) ? null : this._$stateParams.login_username,
			user_pass: null
		};

		this._$scope.login = () =>
		{
			if(this._$scope.login_details.user_name == '' || null || this._$scope.login_details.user_pass == '' || null) return;

			return this._Authentication.login(this._$scope.login_details.user_name, this._$scope.login_details.user_pass)

			.then((session) =>
			{
				return this._$state.go('me');
			})

			.catch((err) =>
			{
				this._$scope.login_details.user_name, this._$scope.login_details.user_pass = null;

				return this._Utility.alert('Invalid login, please try again.');
			});
		}
	}
}

export default Login;