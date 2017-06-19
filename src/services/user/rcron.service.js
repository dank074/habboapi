class rCRONService
{
    constructor(AppConstants, UtilityService, $localStorage, $http, $state, $q)
    {
        'ngInject';

        this._AppConstants	    = AppConstants;
        this._UtilityService    = UtilityService;
        this._$localStorage     = $localStorage;
        this._$http			    = $http;
        this._$state            = $state;
        this._$q			    = $q;
    }

    forward_room(room_id)
    {
        if(this._$localStorage.current_user == undefined || this._$localStorage.current_user.length == 0 || null) return this._$q.reject('invalid_session');

        this._$http.post(this._AppConstants.api + '/services/user/rcron/forward_room', {room_id: room_id})
        
        .then((res) =>
        {
            return this._$state.go('client');
        })
        
        .catch((res) =>
        {
            return this._UtilityService.alert('dialogs.something_wrong');
        });
    }
}

export default rCRONService;