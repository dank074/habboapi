import { Router } from 'express';
import Community from '../../services/community';

class CommunityHttp
{
    constructor()
    {
        let router = Router();

        router.get('/community_info', this.community_info);
        router.get('/staff_users', this.staff_users);

        return router;
    }

    community_info(req, res, next)
    {
        return Community.community_info()

        .then((community_info) =>
        {
            return res.status(200).send({errors: false, error: null, community_info: community_info}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }

    staff_users(req, res, next)
    {
        return Community.staff_users()

        .then((staff_users) =>
        {
            return res.status(200).send({errors: false, error: null, staff_users: staff_users}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }
}

export default CommunityHttp;