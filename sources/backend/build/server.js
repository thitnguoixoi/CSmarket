"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _api = _interopRequireDefault(require("./route/api"));
var _passport = _interopRequireDefault(require("./config/passport"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("./config/cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require('dotenv').config();
var app = (0, _express["default"])();
(0, _cors["default"])(app);
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
(0, _viewEngine["default"])(app);
app.use((0, _cookieParser["default"])());
(0, _passport["default"])(app);
require("./config/steamapi")(app);
(0, _api["default"])(app);
var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log("Running on port " + port);
});