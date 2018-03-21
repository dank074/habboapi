import { Router } from 'express';
import HttpRoutesAuthenticationSessionGet from './get';
import HttpRoutesAuthenticationSessionLogout from './logout';

export default class HttpRoutesAuthenticationSession
{
    constructor()
    {
        this.router = Router();

        this.router.get('/get', HttpRoutesAuthenticationSessionGet);
        this.router.get('/logout', HttpRoutesAuthenticationSessionLogout);
        
        return this.router;
    }
}