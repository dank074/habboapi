
	var RegisterController	= {},
        Regex               = require('regex'),
        hotel_user          = require(__base + '/app/database/models/user/hotel_user').model;

	RegisterController.register = function(req)
    {
        return new Promise(function(resolve, reject)
        {
            var user_name   = (req.body.user_name == undefined || null) ? null : req.body.user_name,
                user_email  = (req.body.user_email == undefined || null) ? null : req.body.user_email,
                user_pass   = (req.body.user_pass == undefined || null) ? null : req.body.user_pass,
                user_cpass  = (req.body.user_cpass == undefined || null) ? null : req.body.user_cpass;

            if(req == null || user_name == null || user_email == null || user_pass == null || user_cpass == null) return reject(new Error('invalid_paramemters'));

            if(RegisterController.validate_username(user_name) == false) return reject(new Error('invalid_username'));

            return resolve(null);
        });
    };

    RegisterController.validate_username = function(user_name)
    {
        if(user_name == null || user_name.length == 0) return false;

        return true;
    };

    RegisterController.validate_email = function(email_address)
    {
        if(email_address == null || email_address.length == 0) return false;

        return true;
    };

	module.exports = RegisterController;