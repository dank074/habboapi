
	var Controller			= {},
		RegisterController	= require(__base + '/app/controllers/register.controller');
	
	Controller.register = function(req, res, next)
	{
        RegisterController.register(req)

        .then(function()
        {
            return res.status(200).send({errors: false, error: null}).end();
        })

        .catch(function(err)
        {
            return res.status(400).send({errors: true, error: err.message, session: null}).end();
        })
	};
	
	Controller.validate_username = function(req, res, next)
	{
		if(req.body.user_name == undefined || null || RegisterController.validate_username(req.body.user_name) == false) return res.status(400).send({errors: true, error: 'invalid_username'}).end();

		return res.status(200).send({errors: false, error: null}).end();
	};

	Controller.validate_email = function(req, res, next)
	{
		if(req.body.email_address == undefined || null || RegisterController.validate_email(req.body.email_address) == false) return res.status(400).send({errors: true, error: 'invalid_email'}).end();

		return res.status(200).send({errors: false, error: null}).end();
	};

	module.exports	= function(app, Middleware)
	{
		app.post('/controller/register/register', Controller.register);
		app.post('/controller/register/validate_username', Controller.validate_username);
		app.post('/controller/register/validate_email', Controller.validate_email);
	};