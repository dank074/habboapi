export default class OpenRoomDirective
{
    constructor()
    {
        this.restrict   = 'A';
    }

    controller($state, $rootScope, $scope)
    {
        'ngInject';

        $scope.$state       = $state;
        $scope.$rootScope   = $rootScope;
    }

    link($scope, $element, $attrs)
    {
        $element.on('click', () =>
        {
            window.postMessage({call: 'open-room', target: $attrs.roomId}, '*');
            return $scope.$state.go('client');
        });
    }
}