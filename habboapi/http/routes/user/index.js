import { Router } from 'express';
import HttpMiddleware from '../../middleware';
import HttpRoutesUserProfile from './profile';
import HttpRoutesUserUpdate from './update';
import HttpRoutesUserValidators from './validators';
import HttpRoutesUserAddUser from './add';

export default class HttpRoutesUser
{
    constructor()
    {
        this.router = Router();

        this.router.use('/profile', new HttpRoutesUserProfile);
        this.router.use('/update', HttpMiddleware.isAuthenticated, new HttpRoutesUserUpdate);
        this.router.use('/validators', new HttpRoutesUserValidators);

        this.router.post('/add', HttpMiddleware.isntAuthenticated, HttpMiddleware.checkCaptcha, HttpRoutesUserAddUser);

        return this.router;
    }
}