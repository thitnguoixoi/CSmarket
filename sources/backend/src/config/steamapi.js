const passport = require("passport");
const { Strategy } = require("passport-steam");
import userService from "../service/userService"
require('dotenv').config();
const strategyOptions = {
    returnURL: `${process.env.NODE_URL}/api/v1/auth/steam/return`,
    realm: `${process.env.NODE_URL}/`,
    apiKey: process.env.STEAM_API_KEY
};

module.exports = app => {
    passport.use(
        new Strategy(strategyOptions, (identifier, profile, done) => {
            profile.identifier = identifier;
            const steamID = profile.id;
            // Assuming profile.id contains the SteamID
            userService.createUser(steamID);
            return done(null, profile);
        }),
    );
    app.use(passport.initialize());
};
