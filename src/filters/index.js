let filtersModule = angular.module('habboapi.filters', []);

filtersModule.filter('secondsToTime', [() =>
{
    return function(seconds)
    {
        let days    = Math.floor(seconds / 86400),
            hours   = Math.floor((seconds % 86400) / 3600),
            mins    = Math.floor(((seconds % 86400) % 3600) / 60),
            secs    = ((seconds % 86400) % 3600) % 60;

        return (days > 0 ? ((days == 1) ? '1 day ' : days + ' days ') : '') + (hours > 0 ? ((hours == 1) ? '1 hour ' : hours + ' hours ') : '') + (mins > 0 ? ((mins == 1) ? '1 min' : mins + ' mins') : '');
    }
}]);

export default filtersModule;