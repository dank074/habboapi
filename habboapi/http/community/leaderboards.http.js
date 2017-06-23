import { Router } from 'express';
import Leaderboards from '../../hotel/community/leaderboards';

class HttpLeaderboards
{
    constructor()
    {
        let router = Router();

        router.get('/leaderboards_info', this.leaderboards_info);

        return router;
    }

    leaderboards_info(req, res, next)
    {
        return Leaderboards.leaderboards_info()

        .then((leaderboards_info) =>
        {
            return res.status(200).send({errors: false, error: null, leaderboards_info: leaderboards_info}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }
}

export default HttpLeaderboards;