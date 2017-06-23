class ProfileService
{
    constructor(AppConstants, $http, $q)
    {
        'ngInject';

        this._AppConstants 	= AppConstants;
        this._$http 		= $http;
        this._$q 			= $q;
    }

    profile_info(user_name)
    {
        if(user_name == '' || null) return this._$q.reject('invalid_parameters');

        return this._$http.post(this._AppConstants.api + '/user/profile/profile_info', {user_name: user_name})
        
        .then((res) =>
        {
            return this._$q.resolve(res.data.profile_info);
        })
        
        .catch((res) =>
        {
            return this._$q.reject((res.data.error == undefined || null) ? 'invalid_user' : res.data.error);
        });
    }
}

export default ProfileService;