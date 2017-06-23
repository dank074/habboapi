import { Router } from 'express';
import Staff from '../../hotel/community/staff';

class HttpStaff
{
    constructor()
    {
        let router = Router();

        router.get('/staff_list', this.staff_list);

        return router;
    }

    staff_list(req, res, next)
    {
        return Staff.staff_list()

        .then((staff_list) =>
        {
            return res.status(200).send({errors: false, error: null, staff_list: staff_list}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }
}

export default HttpStaff;