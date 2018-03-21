import Hotel from '../../../hotel';

module.exports = (req, res, next) =>
{
    return Hotel.Community.loadStaffList()

    .then((staffList) =>
    {
        res.locals = {
            staffList: staffList
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