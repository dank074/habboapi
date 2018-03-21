import { Router } from 'express';
import passport from 'passport';
import HttpRoutesAuthenticationSession from './session';
import HttpRoutesAuthenticationLogin from './login';
import HttpRoutesAuthenticationLoginError from './loginError';
import HttpMiddlewareIsAuthenticated from '../../middleware/isAuthenticated';
import HttpMiddlewareIsntAuthenticated from '../../middleware/isntAuthenticated';

export default class HttpRoutesAuthentication
{
    constructor()
    {
        this.router = Router();

        this.router.use('/session', HttpMiddlewareIsAuthenticated, new HttpRoutesAuthenticationSession);
        this.router.post('/login', HttpMiddlewareIsntAuthenticated, passport.authenticate('local-login', {failWithError: true}), HttpRoutesAuthenticationLogin, HttpRoutesAuthenticationLoginError);
        
        return this.router;
    }
}