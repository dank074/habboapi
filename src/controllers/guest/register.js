export default class GuestRegisterController
{
    constructor(AppConstants, Utility, Authentication, HotelUser, vcRecaptchaService, $state, $scope)
    {
        'ngInject';
        
        this.AppConstants       = AppConstants;
        this.Utility            = Utility;
        this.Authentication     = Authentication;
        this.HotelUser          = HotelUser;
        this.vcRecaptchaService = vcRecaptchaService;
        this.$state             = $state;
        this.$scope             = $scope;

        this.$scope.registerFormDetails = {
            username: null,
            email: null,
            password: null,
            passwordConfirm: null,
            reCAPTCHA: null
        };

        this.$scope.reCAPTCHAId = null;

        this.$scope.register        = () => this.register();
        this.$scope.onCaptchaCreate = () => this.onCaptchaCreate();
    }

    onCaptchaCreate(reCAPTCHAId)
    {
        this.$scope.reCAPTCHAId = reCAPTCHAId;
    }

    register()
    {
        if(this.AppConstants.reCAPTCHASettings.captchaEnabled == false) this.$scope.registerFormDetails.reCAPTCHA = 'disabled';
        
        return this.HotelUser.addUser(this.$scope.registerFormDetails.username, this.$scope.registerFormDetails.email, this.$scope.registerFormDetails.password, this.$scope.registerFormDetails.reCAPTCHA)
        
        .then((user) =>
        {
            return this.Authentication.login(this.$scope.registerFormDetails.username, this.$scope.registerFormDetails.password)
        })
        
        .then((session) =>
        {
            return this.$state.go('home.me');
        })

        .catch((err) =>
        {
            this.vcRecaptchaService.reload(this.$scope.reCAPTCHAId);

            if(err == 'max_accounts') return this.$state.go('login', {message: 'generic.messages.userMaxAccounts'});

            if(err == 'username_unavailable') return this.$scope.registerForm.username.$setValidity('invalidUsernameAvailability', false);
            if(err == 'invalid_email') return this.$scope.registerForm.email.$setValidity('invalidEmail', false);
            if(err == 'email_unavailable') return this.$scope.registerForm.email.$setValidity('invalidEmailAvailability2', false);
            if(err == 'invalid_captcha') return this.Utility.alert('generic.messages.invalidCaptcha');
        });
    }
}