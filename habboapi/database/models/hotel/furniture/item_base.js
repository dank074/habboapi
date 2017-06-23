import Adapter from '../../../adapter';

class HotelItemBaseDB extends Adapter.Model
{
	get tableName()
	{
		return 'items_base';
	}

	get hasTimestamps()
	{
		return false;
	}
}

export default Adapter.model('HotelItemBase', HotelItemBaseDB);