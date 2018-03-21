export default class FollowUserDirective
{
    constructor()
    {
        this.restrict   = 'A';
    }

    controller(HotelrCRON, $state, $rootScope, $scope)
    {
        'ngInject';

        $scope.HotelrCRON   = HotelrCRON;
        $scope.$state       = $state;
        $scope.$rootScope   = $rootScope;
    }

    link($scope, $element, $attrs)
    {
        $element.on('click', () =>
        {
            return $scope.HotelrCRON.stalkUser($attrs.targetId)

            .then(() =>
            {
                return $scope.$state.go('client');
            })

            .catch((err) =>
            {
                return;
            });
        });
    }
}