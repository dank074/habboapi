
	var UserController	= {},
		User			= require(__base + '/app/users/user');
	
	UserController.user_info = function(req, res, next)
	{
		var user_id = (req.body.user_id == undefined || null || typeof req.body.user_id != 'number') ? null : req.body.user_id;

		if(user_id == null) return res.status(400).send({errors: true, error: 'invalid_parameters'});

		User.user_info(user_id)

        .then(function(user_info)
        {
			if(user_info.id != req.user.user_id)
			{
				user_info.mail = undefined;
				user_info.ip_last = undefined;
			}

            return res.status(200).send({errors: false, error: null, user_info: user_info}).end();
        })

        .catch(function(err)
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        })
	};

	UserController.validate_username = function(req, res, next)
	{
		var user_name = (req.body.user_name == undefined || null) ? null : req.body.user_name;

		if(user_name == null) return res.status(400).send({errors: true, error: 'invalid_parameters'}).end();

		User.validate_username(user_name)

		.then(function()
		{
			return res.status(200).send({errors: false, error: null}).end();
		})

		.catch(function(err)
		{
			return res.status(400).send({errors: true, error: err.message}).end();
		});
	};

	UserController.validate_email = function(req, res, next)
	{
		var email_address = (req.body.email_address == undefined || null) ? null : req.body.email_address;

		if(email_address == null) return res.status(400).send({errors: true, error: 'invalid_parameters'}).end();

		User.validate_email(email_address)

		.then(function()
		{
			return res.status(200).send({errors: false, error: null}).end();
		})

		.catch(function(err)
		{
			return res.status(400).send({errors: true, error: err.message}).end();
		});
	};

	module.exports	= function(app, passport, Middleware)
	{
		app.post('/controller/user/user_info', Middleware.is_authenticated, UserController.user_info);
		app.post('/controller/user/validate_username', UserController.validate_username);
		app.post('/controller/user/validate_email', UserController.validate_email);
	};