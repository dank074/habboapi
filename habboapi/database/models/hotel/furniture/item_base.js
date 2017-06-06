import Adapter from '../../../adapter';

class HotelItemBase extends Adapter.Model
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

export default Adapter.model('HotelItemBase', HotelItemBase);