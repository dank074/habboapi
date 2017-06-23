import HotelRoomDB from '../../database/models/hotel/room/room';

class Room
{
    static room_info(room_id)
    {
        return new Promise((resolve, reject) =>
        {
            if(room_id == null || room_id == 0) return reject(new Error('invalid_paramemters'));
            
            return new HotelRoomDB({id: room_id}).fetch({
                withRelated: [
                    {'owner': (qb) => {
                        qb.column('id', 'username', 'last_online', 'motto', 'look', 'online');
                    }},
                    {'group': (qb) => {
                        qb.column('id', 'name', 'badge');
                    }}
                ],
                columns: ['id', 'owner_id', 'name', 'description', 'users', 'users_max', 'guild_id', 'score', 'tags', 'promoted']
            })
            
            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_room'));
                
                return resolve(result.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
}

export default Room;