import moment from 'moment';
import Adapter from '../../adapter';
import HotelUserDB from '../hotel/user/user';
import HotelRoomDB from '../hotel/room/room';
import HotelGroupDB from '../hotel/group/group';

class ApiNewsDB extends Adapter.Model
{
    get tableName()
    {
        return 'api_news';
    }

    get hasTimestamps()
    {
        return true;
    }

    author()
    {
        return this.belongsTo('HotelUserDB', 'user_id');
    }

    room()
    {
        return this.hasOne('HotelRoomDB', 'id', 'room_id');
    }

    group()
    {
        return this.hasOne('HotelGroupDB', 'id', 'group_id');
    }

    static loadNewsList(query = null)
	{
		return new Promise((resolve, reject) =>
        {
            let search = {};

            search.filter   = (query.filter == undefined || null) ? null : query.filter;
            search.page     = (query.page == undefined || null) ? 1 : query.page;

            return ApiNewsDB.query((qb) => {

                if(search.filter == null) qb.where('created_at', '<=', moment().format()).andWhere('news_hidden', '0').orderBy('id', 'DESC');
                else qb.where('news_title', 'like', '%' + search.filter + '%')
                    .orWhere('news_content', 'like', '%' + search.filter + '%')
                    .andWhere('created_at', '<=', moment().format())
                    .andWhere('news_hidden', '0')
                    .orderBy('created_at', 'DESC');

            }).fetchPage({
                pageSize: 5,
                page: search.page,
                columns: ['id', 'user_id', 'news_title', 'news_image', 'created_at']
            })

            .then((results) =>
            {
                if(results == null) return reject(new Error('no_news'));

                let newsList = {};

                newsList.page		= results.pagination.page;
                newsList.pageCount	= results.pagination.pageCount;
                newsList.totalNews  = results.pagination.rowCount;
                newsList.news		= results.toJSON();

                return resolve(newsList);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static loadNewsArticle(id = 0)
    {
        return new Promise((resolve, reject) =>
        {
            if(id == 0 || null) return reject(new Error('invalid_parameters'));

            return ApiNewsDB.query((qb) => {
                if(id == 'latest') qb.where('created_at', '<=', moment().format()).andWhere('news_hidden', '0').orderBy('id', 'DESC').limit(1);
                else if(id != 'latest') qb.where('id', id).andWhere('created_at', '<=', moment().format()).andWhere('news_hidden', '0').limit(1);
                else return reject(new Error('invalid_article'));
            }).fetch({
                withRelated: [
                    {'author': (qb) => {
                        qb.column('id', 'username', 'last_online', 'motto', 'look', 'online');
                    }},
                    {'room': (qb) => {
                        qb.column('id', 'owner_id', 'name', 'description');
                    }},
                    {'group': (qb) => {
                        qb.column('id', 'user_id', 'name', 'description')
                    }}
                ],
                columns: ['id', 'user_id', 'news_title', 'news_content', 'news_image', 'room_id', 'group_id', 'updated_at', 'created_at']
            })
            
            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_article'));

                return resolve(result.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

}

export default Adapter.model('ApiNewsDB', ApiNewsDB);