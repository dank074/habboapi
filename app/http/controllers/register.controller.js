
	var RegisterController	= {},
		User				= require(__base + '/app/users/user');
	
	RegisterController.register = function(req, res, next)
	{
		var user_name	= (req.body.user_name == undefined || null) ? null : req.body.user_name,
			user_email	= (req.body.user_email == undefined || null) ? null : req.body.user_email,
			user_pass	= (req.body.user_pass == undefined || null) ? null : req.body.user_pass;

		if(user_name == null || user_email == null || user_pass == null) return res.status(400).send({errors: true, error: 'invalid_parameters'}).end();

		User.add_user(user_name, user_email, user_pass, req.ip)

        .then(function()
        {
            return res.status(200).send({errors: false, error: null}).end();
        })

        .catch(function(err)
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        })
	};

	module.exports	= function(app, passport, Middleware)
	{
		app.post('/controller/register/register', RegisterController.register);
	};