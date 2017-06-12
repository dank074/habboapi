import { Router } from 'express';
import HttpMiddleware from '../../middleware';
import UserListHttp from './user_list.http';

class HttpUser
{
    constructor()
    {
        let router = Router();

        router.use('/user_list', HttpMiddleware.has_permission('hk_users_list'), new UserListHttp);

        return router;
    }
}

export default HttpUser;