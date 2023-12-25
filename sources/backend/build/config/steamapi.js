"use strict";

var _userService = _interopRequireDefault(require("../service/userService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var passport = require("passport");
var _require = require("passport-steam"),
  Strategy = _require.Strategy;
require('dotenv').config();
var strategyOptions = {
  returnURL: "http://www.csmarket.me:8080".concat("/api/v1/auth/steam/return"),
  realm: "http://www.csmarket.me:8080",
  apiKey: process.env.STEAM_API_KEY
};
module.exports = function (app) {
  passport.use(new Strategy(strategyOptions, function (identifier, profile, done) {
    profile.identifier = identifier;
    var steamid = profile._json.steamid;
    var personaname = profile._json.personaname;
    var profileurl = profile._json.profileurl;
    var avatar = profile._json.avatar;
    var avatarmedium = profile._json.avatarmedium;
    var avatarfull = profile._json.avatarfull;
    _userService["default"].createUser(steamid, personaname, profileurl, avatar, avatarmedium, avatarfull);
    return done(null, profile);
  }));
  app.use(passport.initialize());
};