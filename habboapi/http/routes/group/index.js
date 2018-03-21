import { Router } from 'express';
import HttpRoutesGroupInfo from './info';

export default class HttpRoutesGroup
{
    constructor()
    {
        this.router = Router();

        this.router.post('/info', HttpRoutesGroupInfo);

        return this.router;
    }
}