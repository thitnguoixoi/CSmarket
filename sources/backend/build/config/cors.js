"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var cors = require('cors');
var configCORS = function configCORS(app) {
  var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    //access-control-allow-credentials:true
    optionSuccessStatus: 200
  };
  app.use(cors(corsOptions));
};
var _default = exports["default"] = configCORS;