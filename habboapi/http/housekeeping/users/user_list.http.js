import { Router } from 'express';
import User from '../../../services/user/user';

class UserListHttp
{
    constructor()
    {
        let router = Router();

        router.get('/user_list', this.user_list);

        return router;
    }

    user_list(req, res, next)
    {
        return User.user_list(0)

        .then((users) =>
        {
            console.log(users);
            return res.status(200).send({errors: false, error: null, users: users}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }
}

export default UserListHttp;