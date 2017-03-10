![](https://habbox.com/cache/scripts/fontgenerator/functions/events.php?font=glass_two&str=HabboAPI)

A content management system written in NodeJS with a AngularJS frontend. Designed for use with Arcturus Emulator.

<hr>
### About

**HabboAPI CMS** is an advanced AngularJS application using a solid NodeJS backend which communicates via RESTful JSON calls.

#### Requirements

1. NodeJS (v7.6.0)
2. MySQL Server

#### Packages / Dependences

1. Angular (with animate, aria, messages)
2. Angular Material
3. Angular UI Router
4. Angular UI Router Extras
5. ngStorage
6. Bcrypt 
7. Bluebird 
8. Express (with body-parser, cookie-parser, express-session)
9. Bookshelfjs (with knex & bookshelfjs-page)
10. EJS
11. Glob
12. Passport (with passport-local)
13. MySQL
14. Regex

**Required Dev Dependencies**

1. Browserify (with browserify-ngannotate)
2. Del
3. Gulp (with angular-templatecache, sourcemaps, uglify)
4. Vinyl Buffer (with source-stream)

It is recommened that gulp is installed globally, try this:

**npm install --global gulp-cli**

#### Installation

Import `habboapi.sql` to your MySQL database

Use Command Prompt / Terminal to navigate to the directory in which you extracted HabboAPI CMS.

Run `node install`

Open `config.json` & `src/config/app.constants.js` and modify the keys to your desired settings.

Run `gulp build` *i would like to note that on my system I for some reason have to run this function twice*

Run `node app.js`
