![alt text](https://habboapi.com/assets/images/habbo/logo.png "HabboAPI")

## HabboAPI CMS
a content management system written in NodeJS & AngularJS

## About
HabboAPI is an open source content management system for Arcturus Emulator. This system is built upon NodeJS & AngularJS. The API uses Knex & BookshelfJS for database management, ExpressJS for routing, PassportJS for authentication & session management, Babel for ES6 functionality, and finally Gulp for compiling our frontend code.

## Features
* Login
* Register (reCAPTCHA support)
* Account Settings (client, email, & password)
* Community (latest user & room, random users, rooms & groups)
* News (list with page scrubbing, search, & news comments)
* Leaderboards (most credits, online time, & respects)
* Staff
* Profiles (badges, friends, rooms, groups, general info, profile comments)
* Room page (room owner, general info, room comments, link to open room in client automatically)
* Group page (group owner, group room, general info)
* Client (full support for FlashInterface)

### Backend Features
* HTTPS support
* Limit accounts per ip
* Prevent usernames from containing certain prefixes (ADM-, MOD- etc)
* Maintenance system (allow certain ips access during maintenance)
* Ban system (ip & account)
* Arcturus rCRON
* Ability to hide certain users / ranks from leaderboards, staff list etc

## Requirements
* Nodejs v8.x.x (tested with v8.9.4)
* NPM
* MySQL Server

## Installation
* [Download](https://github.com/billsonnn/habboapi/archive/master.zip) the latest zip
* Create a new folder and extract the zip to it
* Open `config.json` and modify the keys to your desired settings
* Import `habboapi.sql` to your MySQL database

 ### Windows
 * Open command prompt in Administrator mode, run `npm install -g babel-cli@6.26.0 gulp@3.9.1`
 * After that run `npm install`
 * You may recieve warnings for any of the above installations, this is normal, unless there's an error you can ignore it
 * Now run `start.bat`
 * If you have configured everything correctly you should see HabboAPI running. You'll want to keep this window open, closing it will stop HabboAPI.
 * Finally, run `build-complete.bat` This could take awhile...
 * HabboAPI should now be ready

## Additional Setup

 ### reCAPTCHA
 To enable reCAPTCHA support you must register your website with [reCAPTCHA](https://www.google.com/recaptcha)

 * After logging in look for "Register a new site"
 * You'll want to select "reCAPTCHA V2"
 * For domains you'll want to type just your website link, look at the examples.
 * After registering your domain you'll want to find the public and private keys under "Keys" and put these into your `config.json`
 * You may also elect to disable reCAPTCHA, you'll find that in `config.json` as well.

## Demo
* You can view a demo by visiting [habboapi.com](https://habboapi.com)
* This demo does have a working hotel. Test out all the features!

## FAQS
* What emulator does HabboAPI support?
  * HabboAPI is made for the Arcturus Emulator database. Although with some modifications to the database models this system could be used with other databases.

* What type of password encryption does HabboAPI use?
  * HabboAPI uses bcrypt with salts to hash passwords. Therefore MD5, SHA1 and others are not supported out of the box. If necessary you could install the required packages to enable support for these other encryption methods.

* How do I make modifications to frontend code?
  * All code for the frontend can be found in the `src` folder. It is not recommended to make changes to any of the modules contained here. Instead, create a new module and require it into the main app module in `app.js`. All templates are located in `src/views`
  * If you make changes to the `src` folder you must rebuild the project for your changes to take effect. To do this just open command prompt / terminal and navigate to the folder where habboapi is located and run `gulp build-app`. also be sure to restart habboapi.