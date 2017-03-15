import { Router } from 'express';
import RoomController from '../../controllers/room.controller';

class RoomHttpController
{
    constructor()
    {
        let router = Router();

        router.post('/room_info', this.room_info);

        return router;
    }

    room_info(req, res, next)
    {
        if(req.body.room_id == undefined || null) return res.status(400).send({errors: true, error: 'invalid_room'}).end();

        return RoomController.room_info(req.body.room_id)

        .then((room_info) =>
        {
            return res.status(200).send({errors: false, error: null, room_info: room_info}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }
}

export default RoomHttpController;