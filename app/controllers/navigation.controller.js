
	var NavigationController	= {},
		api_navigation    	    = require(__base + '/app/database/models/controllers/api_navigation').model,
        api_navigations   	    = require(__base + '/app/database/collections/controllers/api_navigations').collection;

	NavigationController.navigation_list = function()
	{
		return new Promise(function(resolve, reject)
		{
            new api_navigations({navi_disabled: 0}).fetch()

            .then(function(results)
            {
                if(results == null) return reject(new Error('empty_navigation'));

                return resolve(results.toJSON());
            })

            .catch(function(err)
            {
                return reject(err);
            });
        });
	};

	module.exports = NavigationController;