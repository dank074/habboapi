export default class HotelNews
{
    constructor(HabboAPI, $q)
    {
        'ngInject';

        this.HabboAPI   = HabboAPI;
        this.$q         = $q;
    }

    createNewsLink(article)
	{
		if(article == null) return;

		if(article.id == undefined || null || article.news_title == undefined || null) return;

		return article.news_title.replace(/\s+/g, '-').toLowerCase() + '.' + article.id;
	}

	getNewsIdFromLink(link)
	{
        if(link == null) return;
        
        if(link == 'latest') return 'latest';

		let parts = link.split('.');

		return (parts[1] == undefined || null) ? 0 : parts[1];
	}

    loadNewsList(query)
    {
        if(query == null) return this.$q.reject('invalid_parameters');

        return this.HabboAPI.send('POST', '/news/list', {query: query})

        .then((res) =>
        {
            if(res.data.newsList == undefined || null) return this.$q.reject('no_articles');

            return this.$q.resolve(res.data.newsList);
        })

        .catch((res) =>
        {
            return this.$q.reject(res.data.error);
        });
    }

    loadNewsArticle(id)
    {
        if(id == 0 || null) return this.$q.reject('invalid_parameters');
        
        return this.HabboAPI.send('POST', '/news/info', {id: id})
        
        .then((res) =>
        {
            if(res.data.articleInfo == undefined || null) return this.$q.reject('invalid_article');

            return this.$q.resolve(res.data.articleInfo);
        })

        .catch((res) =>
        {
            return this.$q.reject(res.data.error);
        });
    }

    loadNewsComments(query)
	{
		if(query == null) return this.$q.reject('invalid_parameters');

		return this.HabboAPI.send('POST', '/news/comments/list', {query: query})

		.then((res) =>
		{
			if(res.data.commentList == undefined || null) return this.$q.reject('invalid_comments');

			return this.$q.resolve(res.data.commentList);
		})

		.catch((res) =>
		{
			return this.$q.reject(res.data.error);
		});
    }
    
    addNewsComment(id, comment)
    {
        if(id == 0 || null || comment == null) return this.$q.reject('invalid_parameters');

        return this.HabboAPI.send('POST', '/news/comments/add', {id: id, comment: comment})

        .then((res) =>
        {
            return this.$q.resolve(null);
        })

        .catch((res) =>
		{
			return this.$q.reject(res.data.error);
		});
    }
}