import Adapter from '../../adapter';
import User from './user';
import Room from '../room/room';

class UserPets extends Adapter.Model
{
	get tableName()
	{
		return 'users_pets';
	}

	get hasTimestamps()
	{
		return false;
	}

	owner()
	{
		return this.belongsTo('User', 'user_id');
	}

    room()
    {
        return this.belongsTo('Room', 'room_id');
    }
}

export default UserPets;