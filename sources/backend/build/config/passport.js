"use strict";

var _passport = _interopRequireDefault(require("passport"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var configPassport = function configPassport(app) {
  app.use(_passport["default"].initialize());
  app.use(_passport["default"].session());
  _passport["default"].serializeUser(function (user, done) {
    done(null, user);
  });
  _passport["default"].deserializeUser(function (obj, done) {
    done(null, obj);
  });
};
module.exports = configPassport;