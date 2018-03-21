import Hotel from '../../../hotel';

module.exports = (req, res, next) =>
{
    if(req.body.id == undefined || null)
    {
        res.locals = {
            status: 400,
            errors: true,
            error: 'invalid_parameters'
        };

        return next();
    }
    
    return Hotel.News.loadNewsArticle(req.body.id)

    .then((articleInfo) =>
    {
        res.locals = {
            articleInfo: articleInfo
        };

        return next();
    })

    .catch((err) =>
    {
        res.locals = {
            status: 400,
            errors: true,
            error: err.message
        };

        return next();
    });
}