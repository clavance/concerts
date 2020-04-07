## Concert Map
Another simple full-stack web app which displays the use of React, Node.js, Redis, and external APIs.

Redis, an in-memory key-value data store generally used as a cache, was used as the primary database because of its speed and the small amount of data. For scalability another option eg. Postgres should be used instead.

## Instructions
1. Requires a Spotify account, Google Maps API key (credit card required), Songkick API key (request [here](https://www.songkick.com/api_key_requests/new)).
2. Register the Client and Redirect URI in the Spotify Developers' Portal.
3. Note the Client ID and Client Secret.
4. Add required info to `client/src/keys.json`.
5. `git clone`, `npm start`.
