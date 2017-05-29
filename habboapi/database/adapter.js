import config from '../../config.json';
import knex from 'knex';
import bookshelf from 'bookshelf';

const Adapter = bookshelf(knex(config.database));

Adapter.plugin('registry');
Adapter.plugin('bookshelf-page');

export default Adapter;