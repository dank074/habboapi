import Authentication from './authentication';
import HotelCommunity from './community';
import HotelGroup from './group';
import HabboAPI from './habboapi';
import HotelNews from './news';
import HotelProfile from './profile';
import HotelrCRON from './rcron';
import HotelRoom from './room';
import Session from './session';
import HotelUser from './user';
import Utility from './utility';

let servicesModule = angular.module('habboapi.services', []);

servicesModule.service('Authentication', Authentication);
servicesModule.service('HotelCommunity', HotelCommunity);
servicesModule.service('HotelGroup', HotelGroup);
servicesModule.service('HabboAPI', HabboAPI);
servicesModule.service('HotelNews', HotelNews);
servicesModule.service('HotelProfile', HotelProfile);
servicesModule.service('HotelrCRON', HotelrCRON);
servicesModule.service('HotelRoom', HotelRoom);
servicesModule.service('Session', Session);
servicesModule.service('HotelUser', HotelUser);
servicesModule.service('Utility', Utility);

export default servicesModule;