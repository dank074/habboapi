import ApiNewsDB from '../../database/models/api/news';

class News
{
    static news_list()
    {
        return new Promise((resolve, reject) =>
        {
            return new ApiNewsDB().query((qb) => {
                qb.orderBy('id', 'DESC');
            }).fetchAll({
                columns: ['id', 'title', 'description', 'created_at']
            })
            
            .then((result) =>
            {
                return resolve(result);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
}

export default News;