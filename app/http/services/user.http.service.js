module.exports	= function(app, Middleware)
{
	app.post('/api/service/user/validate_username', function(req, res, next)
	{
		if(req.body.user_name == undefined || null) return res.status(400).send({errors: true, error: 'invalid_parameters'}).end();

		return HabboAPI.Services.User.validate_username(req.body.user_name)

		.then(function resolve()
		{
			return res.status(200).send({errors: false, error: null}).end();
		},
		
		function reject(err)
		{
			return res.status(400).send({errors: true, error: err.message}).end();
		});
	});

	app.post('/api/service/user/validate_email', function(req, res, next)
	{
		if(req.body.email_address == undefined || null) return res.status(400).send({errors: true, error: 'invalid_parameters'}).end();

		return HabboAPI.Services.User.validate_email(req.body.email_address)

		.then(function resolve()
		{
			return res.status(200).send({errors: false, error: null}).end();
		},
		
		function reject(err)
		{
			return res.status(400).send({errors: true, error: err.message}).end();
		});
	});

	app.get('/api/service/user/user_info', Middleware.is_authenticated, function(req, res, next)
	{
		return HabboAPI.Services.User.user_info(req.user.user_id)

        .then(function resolve(user_info)
        {
            return res.status(200).send({errors: false, error: null, user_info: user_info}).end();
        },
		
		function reject(err)
		{
			return res.status(400).send({errors: true, error: err.message}).end();
        });
	});

	app.post('/api/service/user/update_user', Middleware.is_authenticated, function(req, res, next)
	{
		if(req.body.data == undefined || null) return res.status(400).send({errors: true, error: 'invalid_parameters'}).end();

		return HabboAPI.Services.User.update_user(req.user.user_id, req.body.data)

        .then(function resolve()
        {
            return res.status(200).send({errors: false, error: null}).end();
        },
		
		function reject(err)
		{
			return res.status(400).send({errors: true, error: err.message}).end();
        });
	});

	app.post('/api/service/user/update_settings', Middleware.is_authenticated, function(req, res, next)
	{
		if(req.body.data == undefined || null) return res.status(400).send({errors: true, error: 'invalid_parameters'}).end();

		return HabboAPI.Services.User.update_settings(req.user.user_id, req.body.data)

        .then(function resolve()
        {
            return res.status(200).send({errors: false, error: null}).end();
        },
		
		function reject(err)
		{
			return res.status(400).send({errors: true, error: err.message}).end();
        });
	});

	app.post('/api/service/user/update_password', Middleware.is_authenticated, function(req, res, next)
	{
		if(req.body.new_password == undefined || null || req.body.password == undefined || null) return res.status(400).send({errors: true, error: 'invalid_paramemters'}).end();

		return HabboAPI.Services.User.update_password(req.user.user_id, req.body.new_password, req.body.password)

        .then(function resolve()
        {
            return res.status(200).send({errors: false, error: null}).end();
        },
		
		function reject(err)
		{
			return res.status(400).send({errors: true, error: err.message}).end();
        });
	});

	app.post('/api/service/user/update_email', Middleware.is_authenticated, function(req, res, next)
	{
		if(req.body.new_email == undefined || null || req.body.password == undefined || null) return res.status(400).send({errors: true, error: 'invalid_paramemters'}).end();

		return HabboAPI.Services.User.update_email(req.user.user_id, req.body.new_email, req.body.password)

        .then(function resolve()
        {
            return res.status(200).send({errors: false, error: null}).end();
        },
		
		function reject(err)
		{
			return res.status(400).send({errors: true, error: err.message}).end();
        });
	});

	app.post('/api/service/user/add_user', function(req, res, next)
	{
		if(req.body.user_name == undefined || null || req.body.user_email == undefined || null || req.body.user_pass == undefined || null || req.ip == undefined || null) return res.status(400).send({errors: true, error: 'invalid_parameters'}).end();

		return HabboAPI.Services.User.add_user(req.body.user_name, req.body.user_email, req.body.user_pass, req.ip)

        .then(function resolve(user)
        {
            return res.status(200).send({errors: false, error: null, user: user}).end();
        },
        
        function reject(err)
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        })
	});
};