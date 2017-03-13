var ItemBase = HabboAPI.Adapter.Model.extend({
	tableName: 'items_base',
	hasTimestamps: false
});

module.exports = HabboAPI.Adapter.model('ItemBase', ItemBase);