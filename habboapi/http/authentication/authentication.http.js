import passport from 'passport';
import ApiPassport from '../api-passport';
import { Router } from 'express';

class AuthenticationHttp
{
    constructor()
    {
        let router = Router();

        router.post('/login', passport.authenticate('login'), this.login);

        return router;
    }

    login(req, res, next)
    {
        return res.status(200).send({errors: false, error: null, session: req.user}).end();
    }
}

export default AuthenticationHttp;