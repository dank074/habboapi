import Adapter from '../../adapter';
import ApiNewsDB from './news';
import HotelUserDB from '../hotel/user/user';

class ApiNewsCommentsDB extends Adapter.Model
{
    get tableName()
    {
        return 'api_news_comments';
    }

    get hasTimestamps()
    {
        return true;
    }

    article()
    {
        return this.belongsTo('ApiNewsDB', 'article_id');
    }

    user()
    {
        return this.belongsTo('HotelUserDB', 'user_id');
    }

    static loadNewsComments(query = null)
	{
		return new Promise((resolve, reject) =>
		{
			let search = {};

			search.articleId    = (query.articleId == undefined || null) ? null : query.articleId;
			search.page         = (query.page == undefined || null) ? 1 : query.page;
			
			if(search.articleId == null) return resolve({
				page: 0,
				pageCount: 0,
				totalComments: 0,
				comments: null});

			return ApiNewsCommentsDB.where('article_id', search.articleId).orderBy('id', 'DESC')
			
			.fetchPage({
				withRelated: [
					{'user': (qb) => {
                        qb.column('id', 'username', 'motto', 'look', 'online');
                    }}
				],
                pageSize: 5,
                page: search.page,
                columns: ['id', 'article_id', 'user_id', 'message', 'created_at']
            })

            .then((results) =>
            {
                let commentList = {};

                commentList.page			= results.pagination.page;
                commentList.pageCount	    = results.pagination.pageCount;
                commentList.totalComments   = results.pagination.rowCount;
				commentList.comments 		= results.toJSON();

                return resolve(commentList);
            })

            .catch((err) =>
            {
                return reject(err);
            });
		});
    }
    
    static addNewsComment(id = 0, userId = 0, comment = null)
    {
        return new Promise((resolve, reject) =>
        {
            if(id == 0 || null || userId == 0 || null || comment == null) return reject(new Error('invalid_parameters'));

            return new ApiNewsCommentsDB({
                id: null,
                article_id: id,
                user_id: userId,
                message: comment,
                updated_at: null,
                created_at: null
            }).save(null, {method: 'insert'})

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_comment'));

                return resolve(null);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
}

export default Adapter.model('ApiNewsCommentsDB', ApiNewsCommentsDB);