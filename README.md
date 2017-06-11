## HabboAPI CMS
a content management system written in node & angular using es6

#### about
HabboAPI is a powerful open source content management system for Arcturus Emulator. The system is created on top of NodeJS & AngularJS. The backend "HabboAPI Server" handles various REST calls to return JSON data. This server handles all server side functions including authentication, session management, hotel services for groups, profiles, rooms, statistics, & users. Included is also compatibility with Arcturus Emulators rCRON system. With this we can include features like friend request, follow user, enter room, and various other tasks. The frontend "HabboAPI CMS" is built on top of AngularJS. Angular is the template engine for this system and no HTML is handled on the server. Everything is compiled and bundled for the CMS into two files (habbo-api.css & bundle.js) which we get from using gulp. HabboAPI CMS has tons of unique features. Most notably being the ability to run the client right within the CMS. The client will continue to run in the same browser window even while navigating to other pages throughout the CMS. HabboAPI is the next generation in Habbo CMS.

#### requirements
* Nodejs v7.x
* NPM
* MySQL Server

#### installation
* [download](https://github.com/billsonnn/habboapi/archive/master.zip) the latest zip
* create a new folder and extract the zip to it
* Open `config.json` & `constants.js` and modify the keys to your desired settings.
* open command prompt / terminal in root / sudo mode and navigate to the folder you extracted the zip to
* run `npm install -g babel-cli@6.24.0 gulp@3.9.1` 
* run `npm install`
* import `habboapi.sql` to your mysql database
* run `gulp build`
* finally to start the server, run `npm start`

#### demo
* You can view a demo by visiting [habboapi.com](http://habboapi.com)
* This demo does have a working hotel. Test out all the features!

#### features
* me page
* community page
* staff page
* settings page
* profile page
* group page
* room page

#### faqs
* what emulator does HabboAPI CMS support?
  * habboapi is made for the arcturus emulator database. although with some modifications to the database models this system could be coded for other databases.

* what password encryption does HabboAPI CMS use?
  * habboapi uses bcrypt with salts to hash passwords. therefore md5, sha1 etc do not work. modifications to habboapi that change the algorithm is not officially supported, but could easily be done if needed.

* how do I make modifications to angularjs & the templates?
  * all code for the frontend can be found in the `src` folder. it is not recommended to make any changes to any of the modules contained here. instead, create a new module and require it into the main app module in `app.js`. all templates are located in `src/views`
  * if you make any changes to the `src` folder you must rebuild the project for your changes to take effect. to do this just open command prompt / terminal and navigate to the folder where habboapi is located and run `gulp build`. also be sure to restart habboapi.
