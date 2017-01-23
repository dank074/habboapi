
	var Controller              = {},
        NavigationController    = require(__base + '/app/controllers/navigation.controller');

    Controller.navigation_list = function(req, res, next)
    {
        NavigationController.navigation_list()
        
        .then(function(navigation)
        {
            return res.status(200).send({errors: false, error: null, session: req.user, navigation: navigation}).end();
        })
        
        .catch(function(err)
        {
            return res.status(400).send({errors: true, error: err.message, session: req.user, navigation: null}).end();
        })
    };

    module.exports	= function(app, Middleware)
	{
		app.get('/controller/navigation/navigation_list', Middleware.is_authenticated, Controller.navigation_list);
	};