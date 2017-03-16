class CheckUsername
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

            return scope.service.validate_username(element.val())

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

export default CheckUsername;