module.exports = (req, res, next) =>
{
    if(req.isAuthenticated() == false) return next();

    return res.status(401).send({errors: true, error: 'valid_session', session: req.user}).end();
}