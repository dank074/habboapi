module.exports = (err, req, res, next) =>
{
    return res.status(401).send({errors: true, error: err.message, session: req.user}).end();
}