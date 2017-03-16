import angular from 'angular';
import Client from './client.controller';
import Community from './community.controller';
import Group from './group.controller';
import Login from './login.controller';
import Profile from './profile.controller';
import Register from './register.controller';
import Room from './room.controller';
import Settings from './settings.controller';
import Staff from './staff.controller';

let controllers = angular.module('habboapi.controllers', []);

controllers.controller('Client', Client);
controllers.controller('Community', Community);
controllers.controller('Group', Group);
controllers.controller('Login', Login);
controllers.controller('Profile', Profile);
controllers.controller('Register', Register);
controllers.controller('Room', Room);
controllers.controller('Settings', Settings);
controllers.controller('Staff', Staff);

export default controllers;