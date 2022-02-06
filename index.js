const http = require('http');
const hostname = '127.0.0.1';
const port = 2600;

const express = require('express');
const app = express();

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const server = http.createServer(app);
const db = require('./db');

app.get('/', (req, res) => {
     res.render('home', {
          partials: {
               head: '/partials/head',
               navbar: '/partials/navbar'
          }
     })
 });

 app.get('/list', (req, res) => {
      res.render('friend-list', {
           locals: {
                friendData: db,
                path: req.path
           },
           partials: {
               head: '/partials/head',
               navbar: '/partials/navbar'
          }
      })
 })

 app.get('/list/:handle', (req, res) => {
     const { handle } = req.params;

     const afriend = db.find(f => f.handle === handle); //f represent each object in the array, (f is don't find)

     if (afriend) {
          res.render('friend-profile', { //friend in here refere to friend.html
               locals: { //local is an object / the local imformation for the engine
                    afriend, // refere to same friend in friend-profile html
               },
               partials: {
                    head: '/partials/head',
                    navbar: '/partials/navbar'
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
