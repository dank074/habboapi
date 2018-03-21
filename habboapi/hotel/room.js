import Database from '../database';

export default class HotelRoom
{
    static loadRoomInfo(id)
    {
        return Database.Models.Hotel.Room.Room.loadRoomInfo(id);
    }

    static loadRoomList(query)
    {
        return Database.Models.Hotel.Room.Room.loadRoomList(query);
    }

    static loadRoomComments(query)
    {
        return Database.Models.Api.RoomComments.loadRoomComments(query);
    }

    static addRoomComment(id, userId, comment)
    {
        return Database.Models.Api.RoomComments.addRoomComment(id, userId, comment);
    }
}