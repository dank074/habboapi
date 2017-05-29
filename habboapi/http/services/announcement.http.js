import { Router } from 'express';
import HttpMiddleware from '../middleware';
import Announcement from '../../services/announcement';

class AnnouncementHttpService
{
    constructor()
    {
        let router = Router();

        router.get('/announcement_list', HttpMiddleware.is_authenticated, HttpMiddleware.has_permission('hk.announcements.view'), this.announcement_list);
        router.post('/add_announcement', HttpMiddleware.is_authenticated, HttpMiddleware.has_permission('hk.announcements.add'), this.add_announcement);

        return router;
    }

    announcement_list(req, res, next)
    {
        return Announcement.announcement_list()

        .then((announcement_list) =>
        {
            return res.status(200).send({errors: false, error: null, announcement_list: announcement_list}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }

    add_announcement(req, res, next)
    {
        if(req.body.title == undefined || null || req.body.content == undefined || null) return res.status(400).send({errors: true, error: 'invalid_parameters'}).end();

        return Announcement.add_announcement(req.user.user_id, req.body.title, req.body.content)

        .then((announcement) =>
        {
            return res.status(200).send({errors: false, error: null, announcement: announcement}).end();
        })

        .catch((err) =>
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
    }
}

export default AnnouncementHttpService;