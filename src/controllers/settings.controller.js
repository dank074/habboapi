class Settings
{
    constructor(Utility, User, $localStorage, $stickyState, $scope)
    {
        'ngInject';

		this._Utility = Utility;
        this._User = User;
        this._$localStorage = $localStorage;
        this._$stickyState = $stickyState;
        this._$scope = $scope;

		this._$scope.password_details = {
			new_password: null,
			new_cpassword: null,
			password: null
		};

		this._$scope.email_details = {
			new_email: null,
			new_cemail: null,
			password: null
		};

		this._$scope.update_password = () =>
		{
			if(this._$scope.password_details == undefined || this._$scope.password_details.length == 0 || this._$scope.password_details.new_password != this._$scope.password_details.new_cpassword) return this._Utility.alert('Something went wrong, please try again');

			return User.update_user_password(this._$scope.password_details.new_password, this._$scope.password_details.password)

			.then(() =>
			{
				this._$scope.password_details.new_password = null;
				this._$scope.password_details.new_cpassword = null;
				this._$scope.password_details.password = null;

				this._Utility.alert('Your password has been updated!');
			})

			.catch((err) =>
			{
				return this._Utility.alert('Something went wrong, please try again');
			});
		}

		this._$scope.update_email = () =>
		{
			if(this._$scope.email_details == undefined || this._$scope.email_details.length == 0 || this._$scope.email_details.new_email != this._$scope.email_details.new_cemail) return this._Utility.alert('Something went wrong, please try again');

			return User.update_user_email(this._$scope.email_details.new_email, this._$scope.email_details.password)

			.then(() =>
			{
				this._$scope.email_details.new_email = null;
				this._$scope.email_details.new_cemail = null;
				this._$scope.email_details.password = null;

				this._Utility.alert('Your emaill address has been updated!');
			})

			.catch((err) =>
			{
				return this._Utility.alert('Something went wrong, please try again');
			});
		}

		this._$scope.update_client = () =>
		{
			return User.update_user_settings(this._$localStorage.current_user.user_info.settings)

			.then(() =>
			{
				this._$stickyState.reset('client');

				this._Utility.alert('Your client settings have been updated! You must reload the client for the changes to take effect.');
			})

			.catch((err) =>
			{
				return this._Utility.alert('Something went wrong, please try again');
			});
		}
    }
}

export default Settings;