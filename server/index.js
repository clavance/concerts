//jshint esversion: 6

const express = require('express'),
      app = express(),
      cors = require('cors'),
      cookieParser = require('cookie-parser'),
      cryptoRandomString = require('crypto-random-string'),
      keys = require('../client/src/keys.json'),
      path = require('path'),
      request = require('request'),
      router = express.Router(),
      DIST_DIR = path.join(__dirname, '../client/public/'),
      HTML_FILE = path.join(DIST_DIR, 'index.html'),
      port = process.env.PORT || 3001;

var client_id = keys.client_id,
    client_secret = keys.client_secret,
    redirect_uri = keys.redirect_uri,
    grant_type = keys.grant_type,
    state_key = 'spotify_auth_state',
    grant_type = 'authorization_code';

app.use(cors());
app.use(cookieParser());
app.use(express.static(DIST_DIR));


app.get('/', (req, res) => {
 res.sendFile(HTML_FILE);
});

// state not required, but recommended
app.get("/login", (req, res) => {
  var scopes = 'user-read-private user-read-email',
      state = cryptoRandomString({length: 16, type: 'url-safe'});

      console.log(state);

  res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + client_id +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(redirect_uri) +
  '&state=' + state);
});


app.get("/callback", (req, res) => {
  var code = req.query.code || null,
      state = req.query.state || null,
      storedState = req.cookies ? req.cookies[state_key] : null;

      console.log(state);
      console.log(req.cookies);

    // check state matches GET
    if (state === null || state !== storedState) {
      console.error("State mismatch");
    }

    else {
      res.clearCookie(state_key);

    request.post({
        url: "https://accounts.spotify.com/api/token",
        form: {
          code,
          redirect_uri,
          client_secret,
          grant_type
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      },

      (err, response, body) => {
        if (!err && response.statusCode === 200) {
          global.access_token = JSON.parse(body).access_token; //get the access token from response
          global.refresh_token = JSON.parse(body).refresh_token;
          console.log("oauth callback response: ", body);
          console.log("access token: ", access_token);
          console.log("refresh token: ", refresh_token);
          res.redirect("/pending");
        }
      }
    );
  }
});



app.listen(port, function () {
 console.log('App listening on port: ' + port);
});


















//
