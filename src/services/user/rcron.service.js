class rCRONService
{
    constructor(AppConstants, UtilityService, $localStorage, $http, $state, $q)
    {
        'ngInject';

        this._AppConstants	    = AppConstants;
        this._UtilityService    = UtilityService;
        this._$localStorage     = $localStorage;
        this._$http			    = $http;
        this._$q			    = $q;
    }

    forward_room(room_id)
    {
        if(this._$localStorage.current_user == undefined || this._$localStorage.current_user.length == 0 || null) return this._$q.reject('invalid_session');

        this._$http.post(this._AppConstants.api + '/user/rcron/forward_room', {room_id: room_id})
        
        .then((res) =>
        {
            return this._$q.resolve(null);
        })
        
        .catch((res) =>
        {
            return this._$q.reject((res.data.error == undefined || null) ? 'invalid_rcron' : res.data.error);
        });
    }
}

export default rCRONService;