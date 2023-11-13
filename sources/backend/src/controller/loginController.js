const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
import userService from "../service/userService"

// Create the Steam strategy
passport.use(new SteamStrategy
    (
        {
            returnURL: 'http://localhost:8080/auth/steam/return',
            realm: 'http://localhost:8080/',
            apiKey: '19549F4A4973348BF06095C66485DFC9'
        },
        function (identifier, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {

                const steamID = profile.id; // Assuming profile.id contains the SteamID
                userService.createUser(steamID);
                profile.identifier = identifier;
                return done(null, profile);
            });
        }
    )
);

const handleSteamAuth = passport.authenticate('steam', { failureRedirect: '/' });
const handleSteamReturn = passport.authenticate('steam', { failureRedirect: '/' });
function redirectHome(req, res) {
    res.redirect('/');
};
module.exports = {
    handleSteamAuth,
    handleSteamReturn,
    redirectHome
}