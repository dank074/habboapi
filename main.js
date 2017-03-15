import HabboAPI from './habboapi/habboapi';
import config from './config.json';

new HabboAPI(__dirname, config);
// nodemon main.js --exec babel-node --presets es2015,stage-2