class ValidateUsernameDirective
{
    constructor()
    {
        this.restrict   = 'A';
        this.require    = 'ngModel';
    }

    controller(UserService, $scope)
    {
        'ngInject';

        $scope.UserService = UserService;
    }

    link(scope, element, attrs, ngModel)
    {
        element.on('blur', () =>
        {
            if(element.val() == undefined || null || element.val() == '') return;

            return scope.UserService.validate_username(element.val())

            .then(() =>
            {
                return ngModel.$setValidity('username_unavailable', true);
            })

            .catch((err) =>
            {
                return ngModel.$setValidity('username_unavailable', false);
            });
        });
    }
}

export default ValidateUsernameDirective;