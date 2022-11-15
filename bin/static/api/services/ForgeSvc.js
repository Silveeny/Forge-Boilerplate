'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; ///////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Philippe Leefsma 2016 - ADN/Developer Technical Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
///////////////////////////////////////////////////////////////////////


var _BaseSvc2 = require('./BaseSvc');

var _BaseSvc3 = _interopRequireDefault(_BaseSvc2);

var _forgeApis = require('forge-apis');

var _forgeApis2 = _interopRequireDefault(_forgeApis);

var _memoizee = require('memoizee');

var _memoizee2 = _interopRequireDefault(_memoizee);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ForgeSvc = (_temp = _class = function (_BaseSvc) {
  _inherits(ForgeSvc, _BaseSvc);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ForgeSvc(config) {
    _classCallCheck(this, ForgeSvc);

    // will return same result if query arguments are
    // identical { sessionId, refreshToken }

    var _this = _possibleConstructorReturn(this, (ForgeSvc.__proto__ || Object.getPrototypeOf(ForgeSvc)).call(this, config));

    _this.__refresh3LeggedTokenMemo = (0, _memoizee2.default)(function (session, scope) {

      return _this.__refresh3LeggedToken(session, scope);
    }, {

      normalizer: function normalizer(args) {

        var memoId = {
          refreshToken: args[0].forge.refreshToken,
          sessionId: args[0].id
        };

        return JSON.stringify(JSON.stringify(memoId));
      },
      promise: true
    });
    return _this;
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  _createClass(ForgeSvc, [{
    key: 'name',
    value: function name() {

      return 'ForgeSvc';
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getUser',


    /////////////////////////////////////////////////////////
    // Returns current logged in user
    //
    /////////////////////////////////////////////////////////
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(session) {
        var token, url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (session.forge) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', null);

              case 2:
                _context.next = 4;
                return this.get3LeggedTokenMaster(session);

              case 4:
                token = _context.sent;
                url = '' + this._config.oauth.baseUri + '/userprofile/v1/users/@me';
                return _context.abrupt('return', this.requestAsync({
                  token: token.access_token,
                  json: true,
                  url: url
                }));

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getUser(_x) {
        return _ref.apply(this, arguments);
      }

      return getUser;
    }()

    /////////////////////////////////////////////////////////
    // Return token expiry in seconds
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getExpiry',
    value: function getExpiry(token) {

      var age = (0, _moment2.default)().diff(token.time_stamp, 'seconds');

      return token.expires_in - age;
    }

    /////////////////////////////////////////////////////////
    // Stores 2Legged token
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'set2LeggedToken',
    value: function set2LeggedToken(token) {

      //store current time
      token.time_stamp = (0, _moment2.default)().format();

      this._2LeggedToken = token;
    }

    /////////////////////////////////////////////////////////
    // return master token (full privileges),
    // refresh automatically if expired
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'get2LeggedToken',
    value: function get2LeggedToken() {
      var _this2 = this;

      return new Promise(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
          var token;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  token = _this2._2LeggedToken;

                  if (token) {
                    _context2.next = 7;
                    break;
                  }

                  _context2.next = 5;
                  return _this2.request2LeggedToken(_this2._config.oauth.scope);

                case 5:
                  token = _context2.sent;


                  _this2.set2LeggedToken(token);

                case 7:
                  if (!(_this2.getExpiry(token) < 60)) {
                    _context2.next = 12;
                    break;
                  }

                  _context2.next = 10;
                  return _this2.request2LeggedToken(_this2._config.oauth.scope);

                case 10:
                  token = _context2.sent;


                  _this2.set2LeggedToken(token);

                case 12:

                  resolve(token);

                  _context2.next = 18;
                  break;

                case 15:
                  _context2.prev = 15;
                  _context2.t0 = _context2['catch'](0);


                  reject(_context2.t0);

                case 18:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2, [[0, 15]]);
        }));

        return function (_x2, _x3) {
          return _ref2.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // Request new 2-legged with specified scope
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'request2LeggedToken',
    value: function request2LeggedToken(scope) {

      var oAuth2TwoLegged = new _forgeApis2.default.AuthClientTwoLegged(this._config.oauth.clientId, this._config.oauth.clientSecret, Array.isArray(scope) ? scope : [scope]);

      return oAuth2TwoLegged.authenticate();
    }

    /////////////////////////////////////////////////////////
    // Stores 3Legged token
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'set3LeggedTokenMaster',
    value: function set3LeggedTokenMaster(session, token) {

      //store current time
      token.time_stamp = (0, _moment2.default)().format();

      session.forge = session.forge || {
        refreshToken: token.refresh_token
      };

      session.forge.masterToken = token;
    }

    /////////////////////////////////////////////////////////
    // Get 3Legged token
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'get3LeggedTokenMaster',
    value: function get3LeggedTokenMaster(session) {
      var _this3 = this;

      return new Promise(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
          var token;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;

                  if (session.forge) {
                    _context3.next = 3;
                    break;
                  }

                  return _context3.abrupt('return', reject({
                    status: 404,
                    msg: 'Not Found'
                  }));

                case 3:
                  token = session.forge.masterToken;

                  if (!(_this3.getExpiry(token) < 60)) {
                    _context3.next = 9;
                    break;
                  }

                  _context3.next = 7;
                  return _this3.refresh3LeggedToken(session, _this3._config.oauth.scope.join(' '));

                case 7:
                  token = _context3.sent;


                  _this3.set3LeggedTokenMaster(session, token);

                case 9:

                  resolve(token);

                  _context3.next = 15;
                  break;

                case 12:
                  _context3.prev = 12;
                  _context3.t0 = _context3['catch'](0);


                  reject(_context3.t0);

                case 15:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this3, [[0, 12]]);
        }));

        return function (_x4, _x5) {
          return _ref3.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // Stores 3Legged token for client (reduced privileges)
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'set3LeggedTokenClient',
    value: function set3LeggedTokenClient(session, token) {

      //store current time
      token.time_stamp = (0, _moment2.default)().format();

      session.forge.clientToken = token;
    }

    /////////////////////////////////////////////////////////
    // Get 3Legged token for client (reduced privileges)
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'get3LeggedTokenClient',
    value: function get3LeggedTokenClient(session, scope) {
      var _this4 = this;

      return new Promise(function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
          var scopeStr, clientToken, token;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  scopeStr = Array.isArray(scope) ? scope.join(' ') : scope;

                  if (session.forge) {
                    _context4.next = 6;
                    break;
                  }

                  return _context4.abrupt('return', reject({
                    status: 404,
                    msg: 'Not Found'
                  }));

                case 6:
                  if (session.forge.clientToken) {
                    _context4.next = 11;
                    break;
                  }

                  _context4.next = 9;
                  return _this4.refresh3LeggedToken(session, scopeStr);

                case 9:
                  clientToken = _context4.sent;


                  _this4.set3LeggedTokenClient(session, clientToken);

                case 11:
                  token = session.forge.clientToken;

                  if (!(_this4.getExpiry(token) < 60)) {
                    _context4.next = 17;
                    break;
                  }

                  _context4.next = 15;
                  return _this4.refresh3LeggedToken(session, scopeStr);

                case 15:
                  token = _context4.sent;


                  _this4.set3LeggedTokenClient(session, token);

                case 17:

                  resolve(token);

                  _context4.next = 23;
                  break;

                case 20:
                  _context4.prev = 20;
                  _context4.t0 = _context4['catch'](0);


                  reject(_context4.t0);

                case 23:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this4, [[0, 20]]);
        }));

        return function (_x6, _x7) {
          return _ref4.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // Delete 3 legged token (user logout)
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'logout',
    value: function logout(session) {

      session.forge = null;
    }

    /////////////////////////////////////////////////////////
    // Ensure returned token has requested scope
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'refresh3LeggedToken',
    value: function refresh3LeggedToken(session, requestedScope) {
      var _this5 = this;

      return new Promise(function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
          var token;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  token = null;

                case 2:
                  if (!true) {
                    _context5.next = 13;
                    break;
                  }

                  _context5.next = 5;
                  return _this5.__refresh3LeggedTokenMemo(session, requestedScope);

                case 5:
                  token = _context5.sent;

                  if (!(token.scope !== requestedScope)) {
                    _context5.next = 10;
                    break;
                  }

                  _this5.sleep(1000);

                  _context5.next = 11;
                  break;

                case 10:
                  return _context5.abrupt('break', 13);

                case 11:
                  _context5.next = 2;
                  break;

                case 13:

                  resolve(token);

                  _context5.next = 19;
                  break;

                case 16:
                  _context5.prev = 16;
                  _context5.t0 = _context5['catch'](0);


                  reject(_context5.t0);

                case 19:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, _this5, [[0, 16]]);
        }));

        return function (_x8, _x9) {
          return _ref5.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'generateCryptoToken',
    value: function generateCryptoToken() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref6$stringBase = _ref6.stringBase,
          stringBase = _ref6$stringBase === undefined ? 'base64' : _ref6$stringBase,
          _ref6$byteLength = _ref6.byteLength,
          byteLength = _ref6$byteLength === undefined ? 48 : _ref6$byteLength;

      return new Promise(function (resolve, reject) {
        _crypto2.default.randomBytes(byteLength, function (err, buffer) {
          return err ? reject(err) : resolve(buffer.toString(stringBase));
        });
      });
    }

    /////////////////////////////////////////////////////////
    // Refresh 3-legged token with specified scope
    //
    /////////////////////////////////////////////////////////

  }, {
    key: '__refresh3LeggedToken',
    value: function __refresh3LeggedToken(session, scope) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {

        var url = _this6._config.oauth.baseUri + _this6._config.oauth.refreshTokenUri;

        (0, _request2.default)({
          url: url,
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          agentOptions: {
            secureProtocol: 'TLSv1_2_method' // 'TLSv1.2'
          },
          json: true,
          form: {
            client_secret: _this6._config.oauth.clientSecret,
            client_id: _this6._config.oauth.clientId,
            refresh_token: session.forge.refreshToken,
            grant_type: 'refresh_token',
            scope: scope
          }

        }, function (err, response, body) {

          try {

            if (err) {

              return reject(err);
            }

            if (body && body.errors) {

              return reject(body.errors);
            }

            if ([200, 201, 202].indexOf(response.statusCode) < 0) {

              return reject(response);
            }

            session.forge.refreshToken = body.refresh_token;

            body.scope = scope;

            return resolve(body);
          } catch (ex) {

            return reject(ex);
          }
        });
      });
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'sleep',
    value: function sleep(ms) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, ms);
      });
    }

    /////////////////////////////////////////////////////////
    // REST request wrapper
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'requestAsync',
    value: function requestAsync(params) {

      return new Promise(function (resolve, reject) {

        (0, _request2.default)({

          url: params.url,
          method: params.method || 'GET',
          headers: params.headers || {
            'Authorization': 'Bearer ' + params.token
          },
          agentOptions: {
            secureProtocol: 'TLSv1_2_method' // 'TLSv1.2'
          },
          json: params.json,
          body: params.body

        }, function (err, response, body) {

          try {

            if (err) {

              return reject(err);
            }

            if (body && body.errors) {

              return reject(body.errors);
            }

            if (response && [200, 201, 202, 204].indexOf(response.statusCode) < 0) {

              return reject(response.statusMessage);
            }

            return resolve(body ? body.data || body : {});
          } catch (ex) {

            return reject(ex);
          }
        });
      });
    }

    /////////////////////////////////////////////////////////
    // GET systems/:system_id/events/:event_id/hooks/:hook_id
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getHook',
    value: function getHook(token, systemId, eventId, hookId) {

      var url = ForgeSvc.BASE_HOOKS_URL + '/systems/' + (systemId + '/events/' + eventId + '/hooks/' + hookId);

      return this.requestAsync({
        token: token.access_token,
        json: true,
        url: url
      });
    }

    /////////////////////////////////////////////////////////
    // GET systems/:system_id/hooks
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getSystemHooks',
    value: function getSystemHooks(token, systemId) {

      var url = ForgeSvc.BASE_HOOKS_URL + '/systems/' + systemId + '/hooks';

      return this.requestAsync({
        token: token.access_token,
        json: true,
        url: url
      });
    }

    /////////////////////////////////////////////////////////
    // GET systems/:system_id/events/:event_id/hooks
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getEventHooks',
    value: function getEventHooks(token, systemId, eventId) {

      var url = ForgeSvc.BASE_HOOKS_URL + '/systems/' + (systemId + '/events/' + eventId + '/hooks');

      return this.requestAsync({
        token: token.access_token,
        json: true,
        url: url
      });
    }

    /////////////////////////////////////////////////////////
    // GET hooks
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getHooks',
    value: function getHooks(token) {

      var url = ForgeSvc.BASE_HOOKS_URL + '/hooks';

      return this.requestAsync({
        token: token.access_token,
        json: true,
        url: url
      });
    }

    /////////////////////////////////////////////////////////
    // POST systems/:system_id/events/:event_id/hooks
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'createEventHook',
    value: function createEventHook(token, systemId, eventId, params) {

      var url = ForgeSvc.BASE_HOOKS_URL + '/systems/' + (systemId + '/events/' + eventId + '/hooks');

      var body = Object.assign({}, params, {
        callbackUrl: this._config.hooks.callbackUrl
      });

      return this.requestAsync({
        token: token.access_token,
        method: 'POST',
        json: true,
        body: body,
        url: url
      });
    }

    /////////////////////////////////////////////////////////
    // POST systems/:system_id/hooks
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'createSystemHook',
    value: function createSystemHook(token, systemId, params) {

      var url = ForgeSvc.BASE_HOOKS_URL + '/systems/' + (systemId + '/hooks');

      var body = Object.assign({}, params, {
        callbackUrl: this._config.hooks.callbackUrl
      });

      return this.requestAsync({
        token: token.access_token,
        method: 'POST',
        json: true,
        body: body,
        url: url
      });
    }

    /////////////////////////////////////////////////////////
    // DELETE systems/:system_id/events/:event_id/hooks/:hook_id
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'removeHook',
    value: function removeHook(token, systemId, eventId, hookId) {

      var url = ForgeSvc.BASE_HOOKS_URL + '/systems/' + (systemId + '/events/' + eventId + '/hooks/' + hookId);

      return this.requestAsync({
        token: token.access_token,
        method: 'DELETE',
        url: url
      });
    }
  }, {
    key: 'clientId',
    get: function get() {

      return this._config.oauth.clientId;
    }
  }]);

  return ForgeSvc;
}(_BaseSvc3.default), _class.BASE_HOOKS_URL = 'https://developer.api.autodesk.com/webhooks/v1', _temp);
exports.default = ForgeSvc;