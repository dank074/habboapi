import Adapter from '../../adapter';

class ItemBase extends Adapter.Model
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

export default Adapter.model('ItemBase', ItemBase);