"use strict";

var _express = _interopRequireDefault(require("express"));
var _loginController = _interopRequireDefault(require("../controller/loginController"));
var _casesController = _interopRequireDefault(require("../controller/casesController"));
var _skinsController = _interopRequireDefault(require("../controller/skinsController"));
var _usersController = _interopRequireDefault(require("../controller/usersController"));
var _jwtactions = require("../middleware/jwtactions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initApiRoutes = function initApiRoutes(app) {
  router.all("*", _jwtactions.checkUserJWT, _jwtactions.checkUserPermisson);

  /*
  login
  */

  //everyone
  router.get('/auth/steam', _loginController["default"].handleSteamAuth); //, loginController.redirectHome
  router.get('/auth/steam/return', _loginController["default"].handleSteamReturn, _loginController["default"].handleSendProfile);
  router.get('/jwt/steamid', _loginController["default"].getJWT);
  router.get("/users/logout", _usersController["default"].logoutUser);
  router.get("/users/quantity", _usersController["default"].countUserQuantity);
  router.get("/users/opened/quantity", _usersController["default"].countUserOpened);
  router.get("/users/upgraded/quantity", _usersController["default"].countUserUpgraded);

  /*
  Actions affect users
  */

  //user, trader, admin - 7
  router.get("/users/steamid", _usersController["default"].readUser);
  router.put("/users/tradeurl", _usersController["default"].updateTradeURL);
  router.get("/users/cases/open", _usersController["default"].openCase); // caseid

  router.get("/users/skins", _usersController["default"].readUserSkins);
  router.put("/users/skins/withdraw", _usersController["default"].withdrawSkin);
  router.put("/users/skins/sell", _usersController["default"].sellSkin);
  router.put("/users/skins/upgrade", _usersController["default"].upgradeSkin); //userskinid, serverskinid

  //admin - 4
  router.get("/users", _usersController["default"].readUsers);
  router.put("/users/wallet", _usersController["default"].updateWallet);
  router["delete"]("/users", _usersController["default"].deleteUser);
  router.put("/users/groups", _usersController["default"].updateGroup);

  /*
  Actions affect skins in database
  */

  //trader, admin - 2
  //Get skins data, user want to withdraw
  router.get("/skins/withdraw", _skinsController["default"].readWithdrawSkins);
  router.put("/skins/withdraw", _skinsController["default"].updateWithdrawSkin); //withdrawid, isAccept

  //user, trader, admin - 3
  router.get("/skins", _skinsController["default"].readSkins);

  //admin - 3
  router.post("/skins", _skinsController["default"].createSkin);
  router.put("/skins", _skinsController["default"].updateSkin);
  router["delete"]("/skins", _skinsController["default"].deleteSkin);

  /*
  Actions affect cases in database
  */

  //everyone
  router.get("/cases", _casesController["default"].readCases);
  router.get("/cases/skins", _casesController["default"].readCasesSkins); //caseid

  //admin - 5
  router.post("/cases", _casesController["default"].createCase); //name, price, image, groupname
  router.put("/cases", _casesController["default"].updateCase); //caseid, price
  router.post("/cases/skins", _casesController["default"].createCaseSkins); //caseskinid, percent
  router["delete"]("/cases/skins", _casesController["default"].deleteCaseSkins); //caseskinid
  router["delete"]("/cases", _casesController["default"].deleteCase); //caseid

  return app.use("/api/v1", router);
};
module.exports = initApiRoutes;