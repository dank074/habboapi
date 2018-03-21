import HabboAPI from './habboapi';
import config from './config.json'
import translation from './translation.json';

global.__base           = __dirname;
global.__config         = config;
global.__translation    = translation;

new HabboAPI;