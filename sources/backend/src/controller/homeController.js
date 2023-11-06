// get the client
const mysql = require('mysql');

const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'csmarket'
});
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});


// Create the Steam strategy
passport.use(new SteamStrategy({
    returnURL: 'http://localhost:8080/auth/steam/return',
    realm: 'http://localhost:8080/',
    apiKey: '19549F4A4973348BF06095C66485DFC9'
},
    function (identifier, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's Steam profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Steam account with a user record in your database,
            // and return that user instead.
            profile.identifier = identifier;
            return done(null, profile);
        });
    }
));

const handleHome = (req, res) => {
    return res.render("home.ejs", { user: req.user })
}




const handleAccount = (req, res) => {
    res.render('account', { user: req.user });
}

const handleSteamLogout = (req, res) => {
    req.logout();
    res.redirect('/');
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
}

module.exports = {
    handleHome,
    handleAccount,
    handleSteamLogout,
    ensureAuthenticated
}