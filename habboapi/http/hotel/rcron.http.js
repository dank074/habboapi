import { Router } from 'express';
import HttpMiddleware from '../middleware';
import rCRON from '../../hotel/rcron';

class rCRONHttp
{
    constructor()
    {
        let router = Router();

        router.post('/forward_room', HttpMiddleware.is_authenticated, this.forward_room);
        router.post('/follow_user', HttpMiddleware.is_authenticated, this.follow_user);

        return router;
    }

    forward_room(req, res, next)
    {
        if(req.body.room_id == undefined || null) return res.status(400).send({errors: true, error: 'invalid_room'}).end();

        rCRON.forward_user(req.user.user_id, req.body.room_id)
        
        return res.status(200).send({errors: false, error: null}).end();
    }

    follow_user(req, res, next)
    {
        if(req.body.user_id == undefined || null) return res.status(400).send({errors: true, error: 'invalid_user'}).end();

        rCRON.follow_user(req.user.user_id, req.body.user_id)
        
        return res.status(200).send({errors: false, error: null}).end();
    }
}

export default rCRONHttp;