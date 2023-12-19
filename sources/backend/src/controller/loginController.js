const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
import userService from "../service/userService"
require('dotenv').config();
// Create the Steam strategy
// passport.use(new SteamStrategy
//     (
//         {
//             returnURL: `${process.env.NODE_URL}/auth/steam/return`,
//             realm: `${process.env.NODE_URL}/`,
//             apiKey: process.env.STEAM_API_KEY
//         },
//         function (identifier, profile, done) {
//             // asynchronous verification, for effect...
//             process.nextTick(function () {

//                 // const steamID = profile.id;
//                 // // Assuming profile.id contains the SteamID
//                 // userService.createUser(steamID);
//                 // profile.identifier = identifier;
//                 // return done(null, profile);
//                 profile.identifier = identifier;

//                 // let user = await User.findOne({ steamId: profile.id });

//                 let user = {
//                     id: profile._json.steamid,
//                     name: profile._json.personaname,
//                     avatar: profile._json.avatar,
//                 }

//                 return done(null, user);
//             });
//         }
//     )
// );

const handleSteamAuth = passport.authenticate('steam', { session: false });
const handleSteamReturn = passport.authenticate('steam', { session: false });
const handleSendProfile = (req, res) => {
    res.render("authenticated", {
        jwtToken: JSON.stringify(req.user._json),
        clientUrl: process.env.REACT_URL,
    });
}

module.exports = {
    handleSteamAuth,
    handleSteamReturn,
    handleSendProfile
}