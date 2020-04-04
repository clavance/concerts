//jshint esversion: 6

const express = require('express'),
      app = express(),
      base64 = require('base-64'),
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
    state_cookie = 'spotify_auth_state',
    grant_type = 'authorization_code';

app.use(cookieParser()).use(express.static(DIST_DIR)).use(cors());


app.get('/', (req, res) => {
 res.sendFile(HTML_FILE);
});

// state not required, but recommended
app.get("/login", (req, res) => {
  var scopes = 'user-read-private user-read-email user-library-read',
      state = cryptoRandomString({length: 16, type: 'url-safe'});

  res.cookie(state_cookie, state);

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
      storedState = req.cookies ? req.cookies[state_cookie] : null;

    // check state matches GET
    if (state === null || state !== storedState) {
      console.error("State mismatch");
    }

    else {
      res.clearCookie(state_cookie);

    request.post({
        url: "https://accounts.spotify.com/api/token",
        form: {
          code,
          redirect_uri,
          client_secret,
          grant_type
        },
        headers: {
          'Authorization': 'Basic ' + base64.encode(client_id + ':' + client_secret)
        },
        json: true
      },

      (err, response, body) => {
        if (!err && response.statusCode === 200) {
          global.access_token = body.access_token;
          global.refresh_token = body.refresh_token;
          console.log("oauth callback response: ", body);
          console.log("access token: ", access_token);
          console.log("refresh token: ", refresh_token);
          res.redirect("/profile");
        }
      }
    );
  }
});


// refresh token
app.get("/refresh", (req, res) => {

  request.post({
    url: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type,
      refresh_token
    },
    headers: {
      'Authorization': 'Basic ' + base64.encode(client_id + ':' + client_secret)
    },
    json: true
  },

    (err, response, body) => {
      console.log(err);
    if (!err && response.statusCode === 200) {
      access_token = body.access_token;
      console.log(access_token);

      // res.send({
      //   'access_token': access_token
      // });
    }
  });
});


app.get("/profile", (req, res) => {
    request.get("https://api.spotify.com/v1/me", {
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      json: true
    },

    (err, response, body) => {
      console.log("user profile:", body);

      var display_name = body.display_name;
      console.log("username:", display_name);

      res.redirect("/tracks");
    }
  )
});

app.get("/tracks", (req, res) => {
  request.get("https://api.spotify.com/v1/me/tracks", {
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    json: true
  },

  (err, response, body) => {
    console.log("tracks:", body);
    res.json({
      body: body
    });
  })
});


app.listen(port, () => {
  console.log('App listening on port: ' + port);
});


















//
