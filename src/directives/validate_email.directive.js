class ValidateEmailDirective
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

            return scope.UserService.validate_email(element.val())

            .then(() =>
            {
                return ngModel.$setValidity('email_unavailable', true);
            })

            .catch((err) =>
            {
                return ngModel.$setValidity('email_unavailable', false);
            });
        });
    }
}

export default ValidateEmailDirective;