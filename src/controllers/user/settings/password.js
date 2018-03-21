export default class UserSettingsPasswordController
{
    constructor(Utility, HotelUser, $state, $scope)
    {
        'ngInject';

        this.HotelUser  = HotelUser;
        this.Utility    = Utility;
        this.$scope     = $scope;

        this.$scope.passwordFormDetails = {
            password: null,
            passwordNew: null,
            passwordConfirm: null
        };

        this.$scope.updateHotelUserPassword = () => this.updateHotelUserPassword();
    }

    updateHotelUserPassword()
    {
        return this.HotelUser.updateHotelUserPassword(this.$scope.passwordFormDetails.password, this.$scope.passwordFormDetails.passwordNew)

        .then(() =>
        {
            this.$scope.passwordFormDetails.password        = null;
            this.$scope.passwordFormDetails.passwordNew     = null;
            this.$scope.passwordFormDetails.passwordConfirm = null;

            this.$scope.passwordForm.$setPristine();

            return this.Utility.alert('generic.messages.updatedPassword');
        })

        .catch((err) =>
        {
            this.$scope.passwordFormDetails.password = null;
            this.$scope.passwordFormDetails.passwordNew = null;
            this.$scope.passwordFormDetails.passwordConfirm = null;

            this.$scope.passwordForm.passwordNew.$setPristine();
            this.$scope.passwordForm.passwordConfirm.$setPristine();

            document.getElementById("password").focus();

            if(err == 'invalid_password') return this.$scope.passwordForm.password.$setValidity('invalidPassword', false);

            return this.Utility.alert('generic.messages.somethingWrong');
        });
    }
}