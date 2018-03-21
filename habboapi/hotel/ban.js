import Database from '../database';

export default class HotelBan
{
    static checkBan(id, ip)
    {
        return Database.Models.Hotel.Ban.Ban.checkBan(id, ip);
    }
}