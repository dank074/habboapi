import { Router } from 'express';
import Statistics from '../../hotel/statistics';

class StatisticsHttp
{
    constructor()
    {
        let router = Router();

        router.get('/users_online', this.users_online);

        return router;
    }

    users_online(req, res, next)
    {
        return Statistics.users_online()

        .then((count) =>
        {
            return res.status(200).send({errors: false, error: null, users_online: count}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }
}

export default StatisticsHttp;