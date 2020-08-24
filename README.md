# FILER #
A simple Node.JS web based file manager.
Purely server side rendered. Still somewhat in development.


This is just a personal project, use with caution. Also, it
allows anyone to access your files, so don't actually use it.

### Running:
Create a `.env` file for variables. `FILE_PATH` is the root
location where Filer will serve files. Need to have r/w access 
(or at least read).
```
PORT=8080
FILE_PATH=/var/www/html
```
Then you need to install dependencies, build some resources and finally, run:
```
$ npm install
$ gulp build
$ npm start
```


Licensed under MIT License