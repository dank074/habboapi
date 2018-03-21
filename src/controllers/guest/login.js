export default class GuestLoginController
{
    constructor(Utility, Authentication, $state, $stateParams, $scope)
    {
        'ngInject';
        
        this.Utility        = Utility;
        this.Authentication = Authentication;
        this.$state         = $state;
        this.$stateParams   = $stateParams;
        this.$scope         = $scope;

        this.$scope.loginFormDetails = {
            username: null,
            password: null
        };

        this.$scope.login = () => this.login();

        if(this.$stateParams.message != undefined || null) return this.Utility.alert(this.$stateParams.message);
    }

    login()
    {
        if(this.$scope.loginFormDetails.username == null || this.$scope.loginFormDetails.password == null) return;

        return this.Authentication.login(this.$scope.loginFormDetails.username, this.$scope.loginFormDetails.password)

        .then((session) =>
        {
            return this.$state.go('home.me');
        })

        .catch((err) =>
        {
            this.$scope.loginFormDetails.username = null;
            this.$scope.loginFormDetails.password = null;

            this.$scope.loginForm.password.$setPristine();

            document.getElementById("username").focus();

            if(err == 'invalid_login') return this.$scope.loginForm.username.$setValidity('invalidLogin', false);
        });
    }
}