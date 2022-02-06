const http = require('http');

const hostname = '127.0.0.1';
const port = 2050;

const express = require('express');
const app = express();

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const server = http.createServer(app);
const db = require('./db');
const path = require('path/posix');
console.log(db)

app.get('/', (req, res) => { // '/' is the route
     res.render('home', {
          partials: {
               head: '/partials/head'
          }
     })
})

app.get('/friends', (req, res) => {
     res.render('friend-list', {
          locals: {
               friends: db,
               path: req.path //request is coming from the browser
          },
          partials: {
               head: '/partials/head'
          }

     });
})

app.get('/friends/:handle', (req, res) => {
     const { handle } = req.params;

     const friend = db.find(f => f.handle === handle); //f represent each object in the array, (f is don't find)

     if (friend) {
          res.render('friend', { //friend in here refere to friend.html
               locals: { //local is an object / the local imformation for the engine
                    friend, // refere to same friend in html
               }, 
               partials: {
                    head: '/partials/head'
               }
          });
     } else {
          res.status(404)
              .send(`no friend with handle ${handle}`)
              ;
      }
})


server.listen(port, () =>  {
     console.log(`The server is running http://${hostname}:${port}`)
})





// para: when we define a function
// argument: call the function, then I have an argument