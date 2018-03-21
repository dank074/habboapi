import { Router } from 'express';
import HttpRoutesUserUpdateUserEmail from './email';
import HttpRoutesUserUpdateUserPassword from './password';
import HttpRoutesUserUpdateUserSettings from './settings';
import HttpRoutesUserUpdateUser from './user';

export default class HttpRoutesUserUpdate
{
    constructor()
    {
        this.router = Router();

        this.router.post('/email', HttpRoutesUserUpdateUserEmail);
        this.router.post('/password', HttpRoutesUserUpdateUserPassword);
        this.router.post('/settings', HttpRoutesUserUpdateUserSettings);
        this.router.post('/user', HttpRoutesUserUpdateUser);

        return this.router;
    }
}