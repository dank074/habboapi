export default class ValidateEmailDirective
{
    constructor()
    {
        this.restrict   = 'A';
        this.require    = 'ngModel';
    }

    controller(HotelUser, $scope)
    {
        'ngInject';
        
        $scope.HotelUser = HotelUser;
    }

    link(scope, element, attrs, ngModel)
    {
        element.on('blur', () =>
        {
            if(element.val() == undefined || null || element.val() == '') return;

            return scope.HotelUser.validateEmail(element.val())

            .then(() =>
            {
                ngModel.$setValidity('invalidEmail', true);
                return ngModel.$setValidity('invalidEmailAvailability', true);
            })

            .catch((err) =>
            {
                if(err == 'invalid_parameters' || err == 'invalid_email') return ngModel.$setValidity('invalidEmail', false);
                if(err == 'email_unavailable') return ngModel.$setValidity('invalidEmailAvailability', false);
            });
        });
    }
}