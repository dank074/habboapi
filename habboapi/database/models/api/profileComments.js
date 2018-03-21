import Adapter from '../../adapter';
import HotelUserDB from '../hotel/user/user';

class ApiProfileCommentsDB extends Adapter.Model
{
    get tableName()
    {
        return 'api_profile_comments';
    }

    get hasTimestamps()
    {
        return true;
    }

    user()
    {
        return this.belongsTo('HotelUserDB', 'user_id').query('columns', ['id', 'username', 'motto', 'look', 'online']);
    }

    profile()
    {
        return this.belongsTo('HotelUserDB', 'profile_id');
    }

    static loadProfileComments(query = null)
	{
		return new Promise((resolve, reject) =>
		{
			let search = {};

			search.profileId    = (query.profileId == undefined || null) ? null : query.profileId;
			search.page         = (query.page == undefined || null) ? 1 : query.page;
			
			if(search.profileId == null) return resolve({
				page: 0,
				pageCount: 0,
				totalComments: 0,
				comments: null});

			return ApiProfileCommentsDB.where('profile_id', search.profileId).orderBy('id', 'DESC')
			
			.fetchPage({
				withRelated: [
					'user'
				],
                pageSize: 5,
                page: search.page,
                columns: ['id', 'profile_id', 'user_id', 'message', 'created_at']
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
    
    static addProfileComment(id = 0, userId = 0, comment = null)
    {
        return new Promise((resolve, reject) =>
        {
            if(id == 0 || null || userId == 0 || null || comment == null) return reject(new Error('invalid_parameters'));

            return new ApiProfileCommentsDB({
                id: null,
                profile_id: id,
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

export default Adapter.model('ApiProfileCommentsDB', ApiProfileCommentsDB);