import { Router } from 'express';
import News from '../../../services/community/news';

class NewsHttp
{
    constructor()
    {
        let router = Router();

        router.get('/news_list', this.news_list);

        return router;
    }

    news_list(req, res, next)
    {
        return News.news_list()

        .then((news_list) =>
        {
            return res.status(200).send({errors: false, error: null, news_list: news_list}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }
}

export default NewsHttp;