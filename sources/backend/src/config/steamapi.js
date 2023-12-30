const passport = require("passport");
const { Strategy } = require("passport-steam");
import userService from "../service/userService"
require('dotenv').config();
const strategyOptions = {
    returnURL: `${process.env.DOMAIN}/api/v1/auth/steam/return`,
    realm: `${process.env.DOMAIN}`,
    apiKey: process.env.STEAM_API_KEY
};

module.exports = app => {
    passport.use(
        new Strategy(strategyOptions, (identifier, profile, done) => {
            profile.identifier = identifier;
            const steamid = profile._json.steamid;
            const personaname = profile._json.personaname;
            const profileurl = profile._json.profileurl;
            const avatar = profile._json.avatar;
            const avatarmedium = profile._json.avatarmedium;
            const avatarfull = profile._json.avatarfull;
            userService.createUser(steamid, personaname, profileurl, avatar, avatarmedium, avatarfull);
            return done(null, profile);
        }),
    );
    app.use(passport.initialize());
};
