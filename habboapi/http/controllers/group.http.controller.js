import { Router } from 'express';
import GroupController from '../../controllers/group.controller';

class GroupHttpController
{
    constructor()
    {
        let router = Router();

        router.post('/group_info', this.group_info);

        return router;
    }

    group_info(req, res, next)
    {
        if(req.body.group_id == undefined || null) return res.status(400).send({errors: true, error: 'invalid_group'}).end();

        return GroupController.group_info(req.body.group_id)

        .then((group_info) =>
        {
            return res.status(200).send({errors: false, error: null, group_info: group_info}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }
}

export default GroupHttpController;