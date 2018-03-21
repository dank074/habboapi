import Adapter from '../../adapter';
import HotelUserDB from '../hotel/user/user';
import HotelRoomDB from '../hotel/room/room';

class ApiRoomCommentsDB extends Adapter.Model
{
    get tableName()
    {
        return 'api_room_comments';
    }

    get hasTimestamps()
    {
        return true;
    }

    user()
    {
        return this.belongsTo('HotelUserDB', 'user_id').query('columns', ['id', 'username', 'motto', 'look', 'online']);
    }

    room()
    {
        return this.belongsTo('HotelRoomDB', 'room_id').query('columns', ['id', 'name']);
    }

    static loadRoomComments(query = null)
	{
		return new Promise((resolve, reject) =>
		{
			let search = {};

			search.roomId		= (query.roomId == undefined || null) ? null : query.roomId;
			search.page         = (query.page == undefined || null) ? 1 : query.page;
			
			if(search.roomId == null) return resolve({
				page: 0,
				pageCount: 0,
				totalComments: 0,
				comments: null});

			return ApiRoomCommentsDB.where('room_id', search.roomId).orderBy('id', 'DESC')
			
			.fetchPage({
				withRelated: [
					'user'
				],
                pageSize: 5,
                page: search.page,
                columns: ['id', 'room_id', 'user_id', 'message', 'created_at']
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
    
    static addRoomComment(id = 0, userId = 0, comment = null)
    {
        return new Promise((resolve, reject) =>
        {
            if(id == 0 || null || userId == 0 || null || comment == null) return reject(new Error('invalid_parameters'));

            return new ApiRoomCommentsDB({
                id: null,
                room_id: id,
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

export default Adapter.model('ApiRoomCommentsDB', ApiRoomCommentsDB);