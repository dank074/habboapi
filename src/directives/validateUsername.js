export default class ValidateUsernameDirective
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

            return scope.HotelUser.validateUsername(element.val())

            .then(() =>
            {
                return ngModel.$setValidity('invalidUsernameAvailability', true);
            })

            .catch((err) =>
            {
                return ngModel.$setValidity('invalidUsernameAvailability', false);
            });
        });
    }
}