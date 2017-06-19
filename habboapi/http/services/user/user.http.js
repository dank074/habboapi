import { Router } from 'express';
import HttpMiddleware from '../../middleware';
import User from '../../../services/user/user';

class UserHttp
{
    constructor()
    {
        let router = Router();

        router.post('/validate_username', this.validate_username);
        router.post('/validate_email', this.validate_email);
        router.post('/add_user', this.add_user);
        router.post('/update_password', HttpMiddleware.is_authenticated, this.update_password);
        router.post('/update_email', HttpMiddleware.is_authenticated, this.update_email);
        router.post('/update_settings', HttpMiddleware.is_authenticated,this.update_settings);

        return router;
    }

    validate_username(req, res, next)
    {
        if(req.body.user_name == undefined || null) return res.status(400).send({errors: true, error: 'invalid_parameters'}).end();

        return User.validate_username(req.body.user_name)

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

        return User.validate_email(req.body.email_address)

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

        return User.add_user(req.body.user_name, req.body.user_email, req.body.user_pass, req.ip)

        .then(() =>
        {
            return res.status(200).send({errors: false, error: null}).end();
        })
        
        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }

    update_password(req, res, next)
    {
        if(req.body.new_password == undefined || null || req.body.password == undefined || null) return res.status(400).send({errors: true, error: 'invalid_paramemters'}).end();

        return User.update_password(req.user.user_id, req.body.new_password, req.body.password)

        .then(() =>
        {
            return res.status(200).send({errors: false, error: null}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }

    update_email(req, res, next)
    {
        if(req.body.new_email == undefined || null || req.body.password == undefined || null) return res.status(400).send({errors: true, error: 'invalid_paramemters'}).end();

        return User.update_email(req.user.user_id, req.body.new_email, req.body.password)

        .then(() =>
        {
            return res.status(200).send({errors: false, error: null}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }

    update_settings(req, res, next)
    {
        if(req.body.data == undefined || null) return res.status(400).send({errors: true, error: 'invalid_parameters'}).end();

        return User.update_settings(req.user.user_id, req.body.data)

        .then(() =>
        {
            return res.status(200).send({errors: false, error: null}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }
}

export default UserHttp;