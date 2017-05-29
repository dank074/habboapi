import AnnouncementService from './announcement.service';
import AnnouncementsComponent from './announcements.component';

let announcementsModule = angular.module('habboapi.announcements', []);

announcementsModule.service('AnnouncementService', AnnouncementService);
announcementsModule.component('appAnnouncements', AnnouncementsComponent);

export default announcementsModule;