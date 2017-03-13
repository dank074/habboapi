angular.module('app').filter('badgeName', function()
{
    return function(input)
    {  
        return input;
    };
});