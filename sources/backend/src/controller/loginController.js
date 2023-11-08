import connection from "../config/connectDB"
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
// create the connection to database


// Create the Steam strategy
passport.use(new SteamStrategy({
    returnURL: 'http://localhost:8080/auth/steam/return',
    realm: 'http://localhost:8080/',
    apiKey: '19549F4A4973348BF06095C66485DFC9'
},
    function (identifier, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            const steamID = profile.id; // Assuming profile.id contains the SteamID
            const steamName = profile.displayName; // Assuming profile.displayName contains the Steam Name
            connection.query('SELECT * FROM user WHERE SteamID = ?', [steamID], (error, results) => {
                if (error) {
                    return done(error);
                }
                if (results.length === 0) {
                    // console.log(steamID)
                    //         // SteamID doesn't exist in the User table, so insert it
                    connection.query('INSERT INTO user (SteamID, Name) VALUES (?, ?)', [steamID, steamName], (insertError) => {
                        if (insertError) {
                            return done(insertError);
                        }
                    });
                }

                // Continue with the authentication process
                profile.identifier = identifier;
                return done(null, profile);
            });
        });
    }
));

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