const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
import userService from "../service/userService"
require('dotenv').config();
const handleSteamAuth = passport.authenticate('steam', { session: false });
const handleSteamReturn = passport.authenticate('steam', { session: false });
const handleSendProfile = (req, res) => {
    res.render("authenticated", {
        steamprofile: JSON.stringify(req.user._json),
        clientUrl: process.env.REACT_URL,
    });
}


module.exports = {
    handleSteamAuth,
    handleSteamReturn,
    handleSendProfile
}