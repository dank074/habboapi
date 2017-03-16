class CheckEmail
{
    constructor()
    {
        this.restrict   = 'A';
        this.require    = 'ngModel';
    }

    controller(User, $scope)
    {
        'ngInject';
        
        $scope.service = User;
    }

    link(scope, element, attrs, ngModel)
    {
        element.on('blur', () =>
        {
            if(element.val() == undefined || null || element.val() == '') return;

            return scope.service.validate_email(element.val())

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

export default CheckEmail;