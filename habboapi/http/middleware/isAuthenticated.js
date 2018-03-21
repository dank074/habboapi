module.exports = (req, res, next) =>
{
    if(req.isAuthenticated() == true) return next();

    return res.status(401).send({errors: true, error: 'invalid_session', session: req.user}).end();
}