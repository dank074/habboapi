export default class UserSettingsEmailController
{
    constructor(Utility, HotelUser, $scope)
    {
        'ngInject';

        this.Utility    = Utility;
        this.HotelUser  = HotelUser;
        this.$scope     = $scope;

        this.$scope.emailFormDetails = {
            password: null,
            emailNew: null,
            emailConfirm: null
        };

        this.$scope.updateHotelUserEmail = () => this.updateHotelUserEmail();
    }

    updateHotelUserEmail()
    {
        return this.HotelUser.updateHotelUserEmail(this.$scope.emailFormDetails.password, this.$scope.emailFormDetails.emailNew)

        .then(() =>
        {
            this.$scope.emailFormDetails.password       = null;
            this.$scope.emailFormDetails.emailNew       = null;
            this.$scope.emailFormDetails.emailConfirm   = null;

            this.$scope.emailForm.$setPristine();

            return this.Utility.alert('generic.messages.updatedEmail');
        })

        .catch((err) =>
        {
            if(err == 'invalid_password')
            {
                this.$scope.emailFormDetails.password = null;
                
                document.getElementById("password").focus();
                
                return this.$scope.emailForm.password.$setValidity('invalidPassword', false);
            }

            if(err == 'email_unavailable')
            {
                this.$scope.emailFormDetails.emailNew = null;
                this.$scope.emailFormDetails.emailConfirm = null;

                this.$scope.emailForm.emailConfirm.$setPristine();

                document.getElementById("emailNew").focus();

                return this.$scope.emailForm.emailNew.$setValidity('invalidEmailAvailability2', false);
            }

            this.$scope.emailFormDetails.password = null;
            this.$scope.emailFormDetails.emailNew = null;
            this.$scope.emailFormDetails.emailConfirm = null;

            this.$scope.emailForm.$setPristine();

            document.getElementById("password").focus();

            return this.Utility.alert('generic.messages.somethingWrong');
        });
    }
}