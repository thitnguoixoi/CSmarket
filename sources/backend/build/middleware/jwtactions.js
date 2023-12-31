"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require("dotenv").config();
var nonSecurePath = ["/auth/steam", "/auth/steam/return", "/jwt/steamid", "/cases", "/cases/skins", "/users/logout", "/users/quantity", "/users/opened/quantity", "/users/upgraded/quantity"];
var createJWT = function createJWT(payload) {
  // create json web token
  var key = process.env.JWT_KEY;
  var token = null;
  try {
    token = _jsonwebtoken["default"].sign(payload, key);
  } catch (e) {
    console.log("Create token error: ", e);
  }
  return token;
};
var verifyToken = function verifyToken(token) {
  // verify token
  var key = process.env.JWT_KEY;
  var decoded = null;
  try {
    decoded = _jsonwebtoken["default"].verify(token, key);
  } catch (e) {
    console.log("Verify token error: ", e);
  }
  return decoded;
};
var checkUserJWT = function checkUserJWT(req, res, next) {
  // check user json web token
  if (nonSecurePath.includes(req.path)) return next();
  var cookies = req.cookies;
  if (cookies && cookies.jwt) {
    var token = cookies.jwt;
    var decoded = verifyToken(token);
    if (decoded) {
      req.jwt = decoded;
      next();
    } else {
      return res.status(401).json({
        EC: "-1",
        DT: "",
        EM: "User is not authenticate"
      });
    }
  } else {
    return res.status(401).json({
      EC: "-1",
      DT: "",
      EM: "User is not authenticate"
    });
  }
};
var checkUserPermisson = function checkUserPermisson(req, res, next) {
  // control user's permisson
  if (nonSecurePath.includes(req.path)) return next();
  if (req.jwt) {
    var roles = req.jwt.data;
    var currentURL = req.path;
    if (!roles || roles.lenght === 0) {
      return res.status(403).json({
        EC: "-1",
        DT: "",
        EM: "User do not have permission"
      });
    }
    var checkRole = roles.some(function (item) {
      return item.Role.URL === currentURL;
    });
    if (checkRole === true) {
      next();
    } else {
      return res.status(403).json({
        EC: "-1",
        DT: "",
        EM: "User do not have permission"
      });
    }
  } else {
    return res.status(401).json({
      EC: "-1",
      DT: "",
      EM: "User is not authenticates"
    });
  }
};
module.exports = {
  createJWT: createJWT,
  verifyToken: verifyToken,
  checkUserJWT: checkUserJWT,
  checkUserPermisson: checkUserPermisson
};