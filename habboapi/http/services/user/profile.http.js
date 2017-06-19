import { Router } from 'express';
import Profile from '../../../services/user/profile';

class ProfileHttp
{
    constructor()
    {
        let router = Router();

        router.post('/profile_info', this.profile_info);

        return router;
    }

    profile_info(req, res, next)
    {
        if(req.body.user_name == undefined || null) return res.status(400).send({errors: true, error: 'invalid_user'}).end();

        return Profile.profile_info(req.body.user_name)

        .then((profile_info) =>
        {
            return res.status(200).send({errors: false, error: null, profile_info: profile_info}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }
}

export default ProfileHttp;