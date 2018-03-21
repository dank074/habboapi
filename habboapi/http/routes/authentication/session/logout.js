module.exports = (req, res, next) =>
{
    req.logout();
    return res.status(200).send({errors: false, error: null});   
}