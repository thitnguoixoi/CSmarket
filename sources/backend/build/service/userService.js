"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _sequelize = require("sequelize");
var _index = _interopRequireDefault(require("../models/index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _require = require('sequelize'),
  Op = _require.Op;
var createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(steamid, personaname, profileurl, avatar, avatarmedium, avatarfull) {
    var user;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _index["default"].Users.findOne({
            where: {
              SteamID: steamid
            }
          });
        case 3:
          user = _context.sent;
          if (user) {
            _context.next = 9;
            break;
          }
          _context.next = 7;
          return _index["default"].Users.create({
            SteamID: steamid,
            Personaname: personaname,
            Profileurl: profileurl,
            Avatar: avatar,
            Avatarmedium: avatarmedium,
            Avatarfull: avatarfull
          });
        case 7:
          _context.next = 11;
          break;
        case 9:
          _context.next = 11;
          return _index["default"].Users.update({
            Personaname: personaname,
            Profileurl: profileurl,
            Avatar: avatar,
            Avatarmedium: avatarmedium,
            Avatarfull: avatarfull
          }, {
            where: {
              SteamID: steamid
            }
          });
        case 11:
          _context.next = 16;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error('Error creating user: ', _context.t0);
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function createUser(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();
var getUsers = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var users;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          users = [];
          _context2.next = 4;
          return _index["default"].Users.findAll({
            include: {
              model: _index["default"].Group_Users,
              attributes: ["Name"]
            }
          });
        case 4:
          users = _context2.sent;
          if (!users) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", {
            EM: "Get users success",
            EC: "0",
            DT: users
          });
        case 9:
          return _context2.abrupt("return", {
            EM: "Get users success",
            EC: "0",
            DT: []
          });
        case 10:
          _context2.next = 16;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.log("Get users error: ", _context2.t0);
          return _context2.abrupt("return", {
            EM: "Get users error",
            EC: "-1",
            DT: []
          });
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function getUsers() {
    return _ref2.apply(this, arguments);
  };
}();
var getUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(steamid) {
    var user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          user = [];
          _context3.next = 4;
          return _index["default"].Users.findOne({
            where: {
              SteamID: steamid
            },
            include: {
              model: _index["default"].Group_Users,
              attributes: ["Name"]
            }
          });
        case 4:
          user = _context3.sent;
          if (!user) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", {
            EM: "Get user success",
            EC: "0",
            DT: user
          });
        case 9:
          return _context3.abrupt("return", {
            EM: "Get user success",
            EC: "0",
            DT: []
          });
        case 10:
          _context3.next = 16;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          console.log("Get user error: ", _context3.t0);
          return _context3.abrupt("return", {
            EM: "Get user error",
            EC: "-1",
            DT: []
          });
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return function getUser(_x7) {
    return _ref3.apply(this, arguments);
  };
}();
var getUserSkins = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(steamid) {
    var skins, user;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          skins = [];
          _context4.next = 4;
          return _index["default"].Users.findOne({
            where: {
              SteamID: steamid
            }
          });
        case 4:
          user = _context4.sent;
          _context4.next = 7;
          return _index["default"].Users_Skins.findAll({
            where: {
              UserID: user.get({
                plain: true
              }).id,
              Status: _defineProperty({}, Op.notIn, ["Withdraw"])
            },
            attributes: ["id", "SkinID", "UserID"],
            include: {
              model: _index["default"].Skins
            }
          });
        case 7:
          skins = _context4.sent;
          if (!skins) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", {
            EM: "Get user's skin success",
            EC: "0",
            DT: skins
          });
        case 12:
          return _context4.abrupt("return", {
            EM: "Get user's skin success",
            EC: "0",
            DT: []
          });
        case 13:
          _context4.next = 19;
          break;
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", {
            EM: "Get user's skin error",
            EC: "-1",
            DT: []
          });
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 15]]);
  }));
  return function getUserSkins(_x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getTradeURL = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(steamid) {
    var data;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _index["default"].Users.findOne({
            where: {
              SteamID: steamid
            },
            attributes: ['TradeURL']
          });
        case 3:
          data = _context5.sent;
          return _context5.abrupt("return", {
            EM: "Get users success",
            EC: "0",
            DT: data
          });
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.log("Get user TradeURL error: ", _context5.t0);
          return _context5.abrupt("return", {
            EM: "Get user TradeURL error",
            EC: "-1",
            DT: []
          });
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function getTradeURL(_x9) {
    return _ref5.apply(this, arguments);
  };
}();
var updateUserTradeURL = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(steamid, TradeURL) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          if (!(typeof TradeURL === 'string')) {
            _context6.next = 7;
            break;
          }
          _context6.next = 4;
          return _index["default"].Users.update({
            TradeURL: TradeURL
          }, {
            where: {
              SteamID: steamid
            }
          });
        case 4:
          return _context6.abrupt("return", {
            EM: "Your trade is update",
            EC: "0",
            DT: ''
          });
        case 7:
          return _context6.abrupt("return", {
            EM: "Please, enter the string",
            EC: "-1",
            DT: ''
          });
        case 8:
          _context6.next = 14;
          break;
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.log('Error update trade URL: ', _context6.t0);
          return _context6.abrupt("return", {
            EM: "Update trade URL error",
            EC: "-1",
            DT: ''
          });
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function updateUserTradeURL(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();
var withdrawUserSkin = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(steamid, userskinid) {
    var userskin, skins, user;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _index["default"].Users_Skins.findOne({
            where: {
              id: userskinid
            }
          });
        case 3:
          userskin = _context7.sent;
          if (!userskin) {
            _context7.next = 18;
            break;
          }
          _context7.next = 7;
          return _index["default"].Skins.findOne({
            where: {
              id: userskin.get({
                plain: true
              }).SkinID
            }
          });
        case 7:
          skins = _context7.sent;
          if (!(skins.get({
            plain: true
          }).Count != 0)) {
            _context7.next = 17;
            break;
          }
          _context7.next = 11;
          return _index["default"].Users.findOne({
            where: {
              SteamID: steamid
            }
          });
        case 11:
          user = _context7.sent;
          _context7.next = 14;
          return _index["default"].Users_Skins.update({
            Status: "Withdraw"
          }, {
            where: {
              id: userskinid
            }
          });
        case 14:
          return _context7.abrupt("return", {
            EM: "Waiting for sending to user",
            EC: "0",
            DT: ''
          });
        case 17:
          return _context7.abrupt("return", {
            EM: "We didn't have this skin",
            EC: "-1",
            DT: ''
          });
        case 18:
          _context7.next = 24;
          break;
        case 20:
          _context7.prev = 20;
          _context7.t0 = _context7["catch"](0);
          console.log('Withdraw skin error: ', _context7.t0);
          return _context7.abrupt("return", {
            EM: "Withdraw skin error",
            EC: "-1",
            DT: ''
          });
        case 24:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 20]]);
  }));
  return function withdrawUserSkin(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();
var sellUserSkin = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(steamid, userskinid) {
    var user, userskin, originWallet, skin, addWallet, Wallet;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _index["default"].Users.findOne({
            where: {
              SteamID: steamid
            }
          });
        case 3:
          user = _context8.sent;
          _context8.next = 6;
          return _index["default"].Users_Skins.findOne({
            where: {
              id: userskinid
            }
          });
        case 6:
          userskin = _context8.sent;
          if (!userskin) {
            _context8.next = 21;
            break;
          }
          originWallet = user.get({
            plain: true
          }).Wallet;
          _context8.next = 11;
          return _index["default"].Skins.findOne({
            where: {
              id: userskin.SkinID
            }
          });
        case 11:
          skin = _context8.sent;
          addWallet = skin.get({
            plain: true
          }).Price;
          Wallet = parseFloat(addWallet) + parseFloat(originWallet); // new wallet = old wallet + skin's price
          _context8.next = 16;
          return _index["default"].Users.update({
            Wallet: Wallet.toFixed(2)
          }, {
            where: {
              id: user.get({
                plain: true
              }).id
            }
          });
        case 16:
          _context8.next = 18;
          return _index["default"].Users_Skins.destroy(
          // delete user's skin
          {
            where: {
              id: userskinid
            }
          });
        case 18:
          return _context8.abrupt("return", {
            EM: "User skin is selled",
            EC: "0",
            DT: ''
          });
        case 21:
          return _context8.abrupt("return", {
            EM: "Error sell user skin",
            EC: "-1",
            DT: ''
          });
        case 22:
          _context8.next = 28;
          break;
        case 24:
          _context8.prev = 24;
          _context8.t0 = _context8["catch"](0);
          console.log('Error sell user skin: ', _context8.t0);
          return _context8.abrupt("return", {
            EM: "Error sell user skin",
            EC: "-1",
            DT: ''
          });
        case 28:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 24]]);
  }));
  return function sellUserSkin(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();
var updateUserWallet = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(userid, addWallet) {
    var user, parsedValue, isFloat, originWallet, wallet;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _index["default"].Users.findOne({
            where: {
              id: userid
            }
          });
        case 3:
          user = _context9.sent;
          parsedValue = parseFloat(addWallet);
          isFloat = !isNaN(parsedValue) && Number.isFinite(parsedValue) && Number(parsedValue) === parsedValue;
          if (!(isFloat && user)) {
            _context9.next = 14;
            break;
          }
          originWallet = user.get({
            plain: true
          }).Wallet;
          wallet = parseFloat(addWallet) + parseFloat(originWallet);
          _context9.next = 11;
          return _index["default"].Users.update({
            Wallet: wallet.toFixed(2)
          }, {
            where: {
              id: userid
            }
          });
        case 11:
          return _context9.abrupt("return", {
            EM: userid + "'s wallet is update",
            EC: "0",
            DT: ''
          });
        case 14:
          return _context9.abrupt("return", {
            EM: "Please, enter the number",
            EC: "-1",
            DT: ''
          });
        case 15:
          _context9.next = 21;
          break;
        case 17:
          _context9.prev = 17;
          _context9.t0 = _context9["catch"](0);
          console.log('Error update wallet:', _context9.t0);
          return _context9.abrupt("return", {
            EM: "Update wallet error",
            EC: "-1",
            DT: ''
          });
        case 21:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 17]]);
  }));
  return function updateUserWallet(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();
var updateUserGroup = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(userid, groupid) {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          if (!(groupid == 1 || groupid == 2 || groupid == 3)) {
            _context10.next = 7;
            break;
          }
          _context10.next = 4;
          return _index["default"].Users.update({
            GroupID: groupid
          }, {
            where: {
              id: userid
            }
          });
        case 4:
          return _context10.abrupt("return", {
            EM: userid + "'s group is update",
            EC: "0",
            DT: ''
          });
        case 7:
          return _context10.abrupt("return", {
            EM: "Please, enter the group-id",
            EC: "-1",
            DT: ''
          });
        case 8:
          _context10.next = 14;
          break;
        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](0);
          console.log('Error update wallet:', _context10.t0);
          return _context10.abrupt("return", {
            EM: "Update user's group error",
            EC: "-1",
            DT: ''
          });
        case 14:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 10]]);
  }));
  return function updateUserGroup(_x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}();
var deleteUser = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(userid, steamid) {
    var user, userskins;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _index["default"].Users.findOne({
            where: {
              id: userid
            }
          });
        case 3:
          user = _context11.sent;
          _context11.next = 6;
          return _index["default"].Users_Skins.findOne({
            where: {
              id: userid
            }
          });
        case 6:
          userskins = _context11.sent;
          if (!(user && user.SteamID !== steamid && !userskins)) {
            _context11.next = 13;
            break;
          }
          _context11.next = 10;
          return _index["default"].Users.destroy({
            where: {
              id: userid
            }
          });
        case 10:
          return _context11.abrupt("return", {
            EM: userid + " deleted",
            EC: "0",
            DT: ''
          });
        case 13:
          return _context11.abrupt("return", {
            EM: "Can not delete this user",
            EC: "-1",
            DT: ''
          });
        case 14:
          _context11.next = 20;
          break;
        case 16:
          _context11.prev = 16;
          _context11.t0 = _context11["catch"](0);
          console.log('Error delete user:', _context11.t0);
          return _context11.abrupt("return", {
            EM: "Error delete user",
            EC: "-1",
            DT: ''
          });
        case 20:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 16]]);
  }));
  return function deleteUser(_x20, _x21) {
    return _ref11.apply(this, arguments);
  };
}();
var openaCase = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(steamid, caseid) {
    var acase, skins, user, originWallet, caseprice, numberOfSkins, randomValue, index, skinopened, wallet, originOpen, open;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return _index["default"].Cases.findOne({
            where: {
              id: caseid
            }
          });
        case 3:
          acase = _context12.sent;
          if (!acase) {
            _context12.next = 37;
            break;
          }
          _context12.next = 7;
          return _index["default"].Cases_Skins.findAll({
            where: {
              CaseID: caseid
            },
            include: {
              model: _index["default"].Skins,
              attributes: ["Image", "Name", "Float", "Tier"]
            },
            order: [['Percent', 'ASC']]
          });
        case 7:
          skins = _context12.sent;
          if (!(skins.length != 0)) {
            _context12.next = 33;
            break;
          }
          _context12.next = 11;
          return _index["default"].Users.findOne({
            where: {
              SteamID: steamid
            }
          });
        case 11:
          user = _context12.sent;
          originWallet = user.get({
            plain: true
          }).Wallet;
          caseprice = acase.get({
            plain: true
          }).Price;
          if (!(originWallet >= caseprice)) {
            _context12.next = 30;
            break;
          }
          // check if user's wallet is valid
          numberOfSkins = skins.length;
          randomValue = Math.random(); // random opening
          index = 0;
          skinopened = [];
          skins.every(function (skin) {
            index += 1;
            if (index == numberOfSkins) {
              skinopened = skin.get({
                plain: true
              });
              return false;
            } else if (randomValue <= skin.get({
              plain: true
            }).Percent) {
              skinopened = skin.get({
                plain: true
              });
              return false;
            }
            return true;
          });
          _context12.next = 22;
          return _index["default"].Users_Skins.create({
            UserID: user.get({
              plain: true
            }).id,
            SkinID: skinopened.SkinID,
            Status: "Inventory"
          });
        case 22:
          wallet = parseFloat(originWallet) - parseFloat(caseprice); // update user's wallet
          originOpen = user.get({
            plain: true
          }).CountOpen;
          open = parseInt(originOpen) + 1;
          _context12.next = 27;
          return _index["default"].Users.update({
            Wallet: wallet.toFixed(2),
            CountOpen: open
          }, {
            where: {
              id: user.get({
                plain: true
              }).id
            }
          });
        case 27:
          return _context12.abrupt("return", {
            EM: "Case opened",
            EC: "0",
            DT: skinopened
          });
        case 30:
          return _context12.abrupt("return", {
            EM: "Can not open this case",
            EC: "-1",
            DT: ''
          });
        case 31:
          _context12.next = 35;
          break;
        case 33:
          if (!(skins.length == 0)) {
            _context12.next = 35;
            break;
          }
          return _context12.abrupt("return", {
            EM: "Can not open this case",
            EC: "-1",
            DT: ''
          });
        case 35:
          _context12.next = 38;
          break;
        case 37:
          return _context12.abrupt("return", {
            // no case
            EM: "Can not open this case",
            EC: "-1",
            DT: ''
          });
        case 38:
          _context12.next = 44;
          break;
        case 40:
          _context12.prev = 40;
          _context12.t0 = _context12["catch"](0);
          console.log('Error open case:', _context12.t0);
          return _context12.abrupt("return", {
            EM: "Error open case",
            EC: "-1",
            DT: ''
          });
        case 44:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 40]]);
  }));
  return function openaCase(_x22, _x23) {
    return _ref12.apply(this, arguments);
  };
}();
var upgradeUserSkin = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(steamid, userskinid, serverskinid) {
    var user, userskin, serverskin, userskinprice, serverskinprice, percent, randomValue, originUpgrade, upgrade;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return _index["default"].Users.findOne({
            where: {
              SteamID: steamid
            }
          });
        case 3:
          user = _context13.sent;
          _context13.next = 6;
          return _index["default"].Users_Skins.findOne({
            where: {
              id: userskinid
            },
            include: {
              model: _index["default"].Skins,
              attributes: ["Price"]
            }
          });
        case 6:
          userskin = _context13.sent;
          _context13.next = 9;
          return _index["default"].Skins.findOne({
            where: {
              id: serverskinid
            }
          });
        case 9:
          serverskin = _context13.sent;
          userskinprice = parseFloat(userskin.get({
            plain: true
          }).Skin.Price);
          serverskinprice = parseFloat(serverskin.get({
            plain: true
          }).Price);
          if (!(userskin && serverskin && userskinprice < serverskinprice)) {
            _context13.next = 33;
            break;
          }
          percent = userskinprice / serverskinprice; // success rate
          randomValue = Math.random();
          originUpgrade = user.get({
            plain: true
          }).CountUpgrade;
          upgrade = parseInt(originUpgrade) + 1;
          if (!(randomValue <= percent)) {
            _context13.next = 25;
            break;
          }
          _context13.next = 20;
          return _index["default"].Users_Skins.update({
            SkinID: serverskinid
          }, {
            where: {
              id: userskinid
            }
          });
        case 20:
          _context13.next = 22;
          return _index["default"].Users.update({
            CountUpgrade: upgrade
          }, {
            where: {
              id: user.get({
                plain: true
              }).id
            }
          });
        case 22:
          return _context13.abrupt("return", {
            EM: "Skin upgraded success",
            EC: "0",
            DT: ""
          });
        case 25:
          if (!(randomValue > percent)) {
            _context13.next = 31;
            break;
          }
          _context13.next = 28;
          return _index["default"].Users_Skins.destroy({
            where: {
              id: userskinid
            }
          });
        case 28:
          _context13.next = 30;
          return _index["default"].Users.update({
            CountUpgrade: upgrade
          }, {
            where: {
              id: user.get({
                plain: true
              }).id
            }
          });
        case 30:
          return _context13.abrupt("return", {
            EM: "Skin upgraded fail",
            EC: "0",
            DT: ""
          });
        case 31:
          _context13.next = 34;
          break;
        case 33:
          return _context13.abrupt("return", {
            EM: "Can not upgrade this skin",
            EC: "-1",
            DT: ''
          });
        case 34:
          _context13.next = 40;
          break;
        case 36:
          _context13.prev = 36;
          _context13.t0 = _context13["catch"](0);
          console.log('Can not upgrade this skin:', _context13.t0);
          return _context13.abrupt("return", {
            EM: "Can not upgrade this skin",
            EC: "-1",
            DT: ''
          });
        case 40:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 36]]);
  }));
  return function upgradeUserSkin(_x24, _x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
var countOpened = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
    var count;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return _index["default"].Users.sum('CountOpen').then(function (totalCountOpen) {
            count = totalCountOpen; // Gán tổng vào biến count
          })["catch"](function (err) {
            console.error('Get user opened error:', err);
          });
        case 3:
          return _context14.abrupt("return", {
            EM: "Get user opened success",
            EC: "-1",
            DT: count
          });
        case 6:
          _context14.prev = 6;
          _context14.t0 = _context14["catch"](0);
          console.log('Get user opened error:', _context14.t0);
          return _context14.abrupt("return", {
            EM: "Get user opened error",
            EC: "-1",
            DT: ''
          });
        case 10:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 6]]);
  }));
  return function countOpened() {
    return _ref14.apply(this, arguments);
  };
}();
var countUpgraded = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
    var count;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return _index["default"].Users.sum('CountUpgrade').then(function (totalCountUpgrade) {
            count = totalCountUpgrade; // Gán tổng vào biến count
          })["catch"](function (err) {
            console.error('Get user opened error:', err);
          });
        case 3:
          return _context15.abrupt("return", {
            EM: "Get user opened success",
            EC: "-1",
            DT: count
          });
        case 6:
          _context15.prev = 6;
          _context15.t0 = _context15["catch"](0);
          console.log('Get user opened error:', _context15.t0);
          return _context15.abrupt("return", {
            EM: "Get user opened error",
            EC: "-1",
            DT: ''
          });
        case 10:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 6]]);
  }));
  return function countUpgraded() {
    return _ref15.apply(this, arguments);
  };
}();
var countUser = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
    var count;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return _index["default"].Users.count().then(function (userCount) {
            count = userCount;
          })["catch"](function (err) {
            console.error('Get user opened error', err);
          });
        case 3:
          return _context16.abrupt("return", {
            EM: "Get user opened success",
            EC: "-1",
            DT: count
          });
        case 6:
          _context16.prev = 6;
          _context16.t0 = _context16["catch"](0);
          console.log('Get amount of user error:', _context16.t0);
          return _context16.abrupt("return", {
            EM: "Get amount of user error",
            EC: "-1",
            DT: ''
          });
        case 10:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 6]]);
  }));
  return function countUser() {
    return _ref16.apply(this, arguments);
  };
}();
module.exports = {
  getUser: getUser,
  createUser: createUser,
  getUsers: getUsers,
  deleteUser: deleteUser,
  getTradeURL: getTradeURL,
  updateUserTradeURL: updateUserTradeURL,
  updateUserWallet: updateUserWallet,
  updateUserGroup: updateUserGroup,
  getUserSkins: getUserSkins,
  withdrawUserSkin: withdrawUserSkin,
  sellUserSkin: sellUserSkin,
  openaCase: openaCase,
  upgradeUserSkin: upgradeUserSkin,
  countOpened: countOpened,
  countUpgraded: countUpgraded,
  countUser: countUser
};