import Database from '../database';

export default class HotelGroup
{
    static loadGroupInfo(id)
    {
        return Database.Models.Hotel.Group.Group.loadGroupInfo(id);
    }
}