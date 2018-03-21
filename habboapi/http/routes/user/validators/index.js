import { Router } from 'express';
import HttpRoutesHotelValidatorsEmail from './email';
import HttpRoutesHotelValidatorsUsername from './username';

export default class HttpRoutesHotelValidators
{
    constructor()
    {
        this.router = Router();

        this.router.post('/email', HttpRoutesHotelValidatorsEmail);
        this.router.post('/username', HttpRoutesHotelValidatorsUsername);

        return this.router;
    }
}