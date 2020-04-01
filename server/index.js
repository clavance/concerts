//jshint esversion: 6

const express = require('express'),
      app = express(),
      cors = require('cors'),
      path = require('path'),
      request = require('request'),
      router = express.Router(),
      keys = require('../client/src/keys.json'),
      DIST_DIR = path.join(__dirname, '../client/public/'),
      HTML_FILE = path.join(DIST_DIR, 'index.html'),
      port = process.env.PORT || 3001;

var client_id = keys.client_id,
    client_secret = keys.client_secret,
    redirect_uri = keys.redirect_uri;

app.use(cors());
app.use(express.static(DIST_DIR));


app.get('/', (req, res) => {
 res.sendFile(HTML_FILE);
});


app.get("/login", (req, res) => {
  var scopes = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + client_id +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(redirect_uri));
});



app.listen(port, function () {
 console.log('App listening on port: ' + port);
});
