import Database from '../database';

export default class HotelNews
{
    static loadNewsList(query)
    {
        return Database.Models.Api.News.loadNewsList(query);
    }

    static loadNewsArticle(id)
    {
        return Database.Models.Api.News.loadNewsArticle(id);
    }

    static loadNewsComments(query)
    {
        return Database.Models.Api.NewsComments.loadNewsComments(query);
    }

    static addNewsComment(id, userId, comment)
    {
        return Database.Models.Api.NewsComments.addNewsComment(id, userId, comment);
    }
}