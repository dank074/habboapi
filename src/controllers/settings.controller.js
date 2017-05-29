class SettingsController
{
    constructor(AppConstants, UserService, UtilityService, $localStorage, $stickyState, $rootScope, $scope)
    {
        'ngInject';

        this._AppConstants      = AppConstants;
        this._UserService       = UserService;
        this._UtilityService    = UtilityService;
        this._$localStorage     = $localStorage;
        this._$stickyState      = $stickyState;
        this._$rootScope        = $rootScope;
        this._$scope            = $scope;

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
			if(this._$scope.password_details == undefined || this._$scope.password_details.length == 0 || this._$scope.password_details.new_password != this._$scope.password_details.new_cpassword) return this._UtilityService.alert('dialogs.something_wrong');

			return this._UserService.update_password(this._$scope.password_details.new_password, this._$scope.password_details.password)

			.then(() =>
			{
				this._$scope.password_details.new_password = null;
				this._$scope.password_details.new_cpassword = null;
				this._$scope.password_details.password = null;

				this._UtilityService.alert('dialogs.password_updated');
			})

			.catch((err) =>
			{
				return this._UtilityService.alert('dialogs.something_wrong');
			});
		}

		this._$scope.update_email = () =>
		{
			if(this._$scope.email_details == undefined || this._$scope.email_details.length == 0 || this._$scope.email_details.new_email != this._$scope.email_details.new_cemail) return this._UtilityService.alert('dialogs.something_wrong');

			return this._UserService.update_email(this._$scope.email_details.new_email, this._$scope.email_details.password)

			.then(() =>
			{
				this._$localStorage.current_user.user_info.mail = this._$scope.email_details.new_email;

				this._$scope.email_details.new_email = null;
				this._$scope.email_details.new_cemail = null;
				this._$scope.email_details.password = null;

				this._UtilityService.alert('dialogs.email_updated');
			})

			.catch((err) =>
			{
				return this._UtilityService.alert('dialogs.something_wrong');
			});
		}

		this._$scope.update_client = () =>
		{
			return this._UserService.update_settings(this._$localStorage.current_user.user_info.settings)

			.then(() =>
			{
				this._$stickyState.reset('client');
				this._UtilityService.alert('dialogs.client_updated');
			})

			.catch((err) =>
			{
				return this._UtilityService.alert('dialogs.something_wrong');
			});
		}
    }
}

export default SettingsController;