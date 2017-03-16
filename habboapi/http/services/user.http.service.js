import { Router } from 'express';
import UserService from '../../services/user.service';
import SessionService from '../../services/session.service';

class UserHttpService
{
    constructor()
    {
		let router = Router();

    	router.post('/validate_username', this.validate_username);
        router.post('/validate_email', this.validate_email);
		router.post('/add_user', this.add_user);
        router.post('/update_user', this.is_authenticated, this.update_user);
        router.post('/update_user_settings', this.is_authenticated, this.update_user_settings);
        router.post('/update_user_password', this.is_authenticated, this.update_user_password);
        router.post('/update_user_email', this.is_authenticated, this.update_user_email);

		return router;
    }

    validate_username(req, res, next)
    {
        if(req.body.user_name == undefined || null) return res.status(400).send({errors: true, error: 'invalid_parameters'}).end();

		return UserService.validate_username(req.body.user_name)

		.then(() =>
		{
			return res.status(200).send({errors: false, error: null}).end();
		})

		.catch((err) =>
		{
			return res.status(400).send({errors: true, error: err.message}).end();
		});
    }

    validate_email(req, res, next)
    {
        if(req.body.email_address == undefined || null) return res.status(400).send({errors: true, error: 'invalid_parameters'}).end();

		return UserService.validate_email(req.body.email_address)

		.then(() =>
		{
			return res.status(200).send({errors: false, error: null}).end();
		})

		.catch((err) =>
		{
			return res.status(400).send({errors: true, error: err.message}).end();
		});
    }

	add_user(req, res, next)
    {
        if(req.body.user_name == undefined || null || req.body.user_email == undefined || null || req.body.user_pass == undefined || null || req.ip == undefined || null) return res.status(400).send({errors: true, error: 'invalid_parameters'}).end();

		return UserService.add_user(req.body.user_name, req.body.user_email, req.body.user_pass, req.ip)

        .then((user) =>
        {
            return res.status(200).send({errors: false, error: null, user: user}).end();
        })
        
        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }

    update_user(req, res, next)
    {
        if(req.body.data == undefined || null) return res.status(400).send({errors: true, error: 'invalid_parameters'}).end();

		return UserService.update_user(req.user.user_id, req.body.data)

		.then(() =>
		{
			return res.status(200).send({errors: false, error: null}).end();
		})

		.catch((err) =>
		{
			return res.status(400).send({errors: true, error: err.message}).end();
		});
    }

    update_user_settings(req, res, next)
    {
        if(req.body.data == undefined || null) return res.status(400).send({errors: true, error: 'invalid_parameters'}).end();

		return UserService.update_user_settings(req.user.user_id, req.body.data)

		.then(() =>
		{
			return res.status(200).send({errors: false, error: null}).end();
		})

		.catch((err) =>
		{
			return res.status(400).send({errors: true, error: err.message}).end();
		});
    }

    update_user_password(req, res, next)
    {
        if(req.body.new_password == undefined || null || req.body.password == undefined || null) return res.status(400).send({errors: true, error: 'invalid_paramemters'}).end();

		return UserService.update_user_password(req.user.user_id, req.body.new_password, req.body.password)

		.then(() =>
		{
			return res.status(200).send({errors: false, error: null}).end();
		})

		.catch((err) =>
		{
			return res.status(400).send({errors: true, error: err.message}).end();
		});
    }

    update_user_email(req, res, next)
    {
        if(req.body.new_email == undefined || null || req.body.password == undefined || null) return res.status(400).send({errors: true, error: 'invalid_paramemters'}).end();

		return UserService.update_user_email(req.user.user_id, req.body.new_email, req.body.password)

		.then(() =>
		{
			return res.status(200).send({errors: false, error: null}).end();
		})

		.catch((err) =>
		{
			return res.status(400).send({errors: true, error: err.message}).end();
		});
    }

	is_authenticated(req, res, next)
    {
        if(req.user == undefined || null) return res.status(400).send({errors: true, error: 'invalid_session'}).end();
        
        return SessionService.validate_session(req.user.user_id, req.user.user_name, req.user.user_session, req.ip, req.headers['user-agent'])
        
        .then((session) =>
        {
            next();
            return null;
        })

        .catch((err) =>
        {
            if(req.isAuthenticated == true) req.logout();

            return res.status(401).send({errors: true, error: err.message, session: null}).end();
        });
    }
}

export default UserHttpService;