import { Router } from 'express';
import passport from 'passport';
import ApiPassport from '../api-passport';
import HotelUser from '../../hotel/user/user';
import Session from '../../hotel/authentication/session';
import HttpSession from './session.http';

class HttpAuthentication
{
    constructor()
    {
        let router = Router();

        router.use('/session', new HttpSession);

        router.post('/login', passport.authenticate('login'), this.login);

        return router;
    }

    login(req, res, next)
    {
        return HotelUser.check_ban(req.user.user_id)
        
        .then((ban) =>
        {
            Session.destroy_session(req.user.user_id);
            
            req.logout();
            return res.status(401).send({errors: true, error: 'user_banned', ban: ban}).end();
        })
        
        .catch((err) =>
        {
            return res.status(200).send({errors: false, error: null, session: req.user}).end();
        });
    }
}

export default HttpAuthentication;