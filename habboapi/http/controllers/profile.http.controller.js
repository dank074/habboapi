import { Router } from 'express';
import ProfileController from '../../controllers/profile.controller';

class ProfileHttpController
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

        return ProfileController.profile_info(req.body.user_name)

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

export default ProfileHttpController;