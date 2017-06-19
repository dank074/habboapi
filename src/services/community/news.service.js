class NewsService
{
	constructor(AppConstants, $http, $q)
	{
		'ngInject';

		this._AppConstants 	= AppConstants;
		this._$http 		= $http;
		this._$q 			= $q;
	}

	news_list()
	{
		return this._$http.get(this._AppConstants.api + '/services/community/news/news_list')

		.then((res) =>
		{
			return this._$q.resolve(res.data.news_list);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'no_news' : res.data.error);
		});
	}
}

export default NewsService;