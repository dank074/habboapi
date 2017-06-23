import { Router } from 'express';
import Statistics from '../../hotel/community/statistics';

class HttpStatistics
{
    constructor()
    {
        let router = Router();

        router.get('/statistics_info', this.statistics_info)
        router.get('/users_online', this.users_online);

        return router;
    }

    statistics_info(req, res, next)
    {
        return Statistics.statistic_info()

        .then((statistics_info) =>
        {
            return res.status(200).send({errors: false, error: null, statistics_info: statistics_info}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
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

export default HttpStatistics;