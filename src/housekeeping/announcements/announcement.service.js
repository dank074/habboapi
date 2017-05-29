class AnnouncementService
{
    constructor(AppConstants, $http, $q)
    {
        'ngInject';

        this._AppConstants  = AppConstants;
        this._$http 	    = $http;
        this._$q 			= $q;
    }

    announcement_list()
    {
        return this._$http.get(this._AppConstants.api + '/service/announcement/announcement_list')

        .then((res) =>
        {
            if(res.data.announcement_list == undefined || res.data.announcement_list.length == 0 || null) return this._$q.reject('no_announcements');

            return this._$q.resolve(res.data.announcement_list);
        })

        .catch((res) =>
        {
            return this._$q.reject((res.data.error == undefined || null) ? 'no_announcements' : res.data.error);
        });
    }

    add_announcement(title, content)
    {
        if(title == '' || null || content == '' || null) return this._$q.reject('invalid_parameters');

        return this._$http.post(this._AppConstants.api + '/service/announcement/add_announcement', {title: title, content: content})

        .then((res) =>
        {
            if(res.data.announcement == undefined || res.data.announcement.length == 0 || null) return this._$q.reject('invalid_announcement');
            
            return this._$q.resolve(null);
        })

        .catch((res) =>
        {
            return this._$q.reject((res.data.error == undefined || null) ? 'invalid_announcement' : res.data.error);
        })
    }
}

export default AnnouncementService;