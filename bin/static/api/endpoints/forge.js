'use strict';

var _SvcManager = require('../services/SvcManager');

var _SvcManager2 = _interopRequireDefault(_SvcManager);

var _oauth = require('oauth');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _c0nfig = require('c0nfig');

var _c0nfig2 = _interopRequireDefault(_c0nfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } ///////////////////////////////////////////////////////////////////////
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


module.exports = function () {
  var _this = this;

  var router = _express2.default.Router();

  /////////////////////////////////////////////////////////
  // Initialize OAuth library
  //
  /////////////////////////////////////////////////////////

  var oauth2 = new _oauth.OAuth2(_c0nfig2.default.forge.oauth.clientId, _c0nfig2.default.forge.oauth.clientSecret, _c0nfig2.default.forge.oauth.baseUri, _c0nfig2.default.forge.oauth.authorizationUri, _c0nfig2.default.forge.oauth.accessTokenUri, null);

  /////////////////////////////////////////////////////////
  // login endpoint
  //
  /////////////////////////////////////////////////////////
  router.post('/login', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var authURL, forgeSvc, csrf;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              req.session.redirect = req.body.origin || '/';

              authURL = oauth2.getAuthorizeUrl({
                redirect_uri: _c0nfig2.default.forge.oauth.redirectUri,
                scope: _c0nfig2.default.forge.oauth.scope.join(' ')
              });
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context.next = 5;
              return forgeSvc.generateCryptoToken();

            case 5:
              csrf = _context.sent;


              req.session.csrf = csrf.replace(/\+/g, ' ');

              res.json(authURL + '&response_type=code&state=' + csrf);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // logout endpoint
  //
  /////////////////////////////////////////////////////////
  router.post('/logout', function (req, res) {

    var forgeSvc = _SvcManager2.default.getService('ForgeSvc');

    forgeSvc.logout(req.session);

    res.json('success');
  });

  /////////////////////////////////////////////////////////
  // GET /clientId
  // Get Forge app clientId
  //
  /////////////////////////////////////////////////////////
  router.get('/clientId', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var forgeSvc, expire;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:

              try {
                forgeSvc = _SvcManager2.default.getService('ForgeSvc');
                expire = new Date(Date.now() + 2592000000).toUTCString();


                res.setHeader('Cache-Control', 'public, max-age=2592000');
                res.setHeader('Expires', expire);

                res.json({
                  clientId: forgeSvc.clientId
                });
              } catch (ex) {

                res.status(ex.status || 500);
                res.json(ex);
              }

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /user
  // Get current user
  //
  /////////////////////////////////////////////////////////
  router.get('/user', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var userSvc, user;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              userSvc = _SvcManager2.default.getService('UserSvc');

              1;
              _context3.next = 5;
              return userSvc.getCurrentUser(req.session);

            case 5:
              user = _context3.sent;

              if (user) {
                _context3.next = 9;
                break;
              }

              res.status(404);
              return _context3.abrupt('return', res.json('Not Found'));

            case 9:

              res.json(user);

              _context3.next = 16;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3['catch'](0);


              res.status(_context3.t0.status || 404);
              res.json(_context3.t0);

            case 16:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this, [[0, 12]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // Reply looks as follow:
  //
  //  access_token: "...",
  //  refresh_token: "...",
  //  results: {
  //    token_type: "Bearer",
  //    expires_in: 86399,
  //    access_token: "..."
  //  }
  //
  /////////////////////////////////////////////////////////
  router.get('/callback/oauth', function (req, res) {

    var csrf = req.query.state;

    if (csrf !== req.session.csrf) {

      return res.status(401).end();
    }

    // filter out errors (access_denied, ...)
    if (req.query && req.query.error) {

      return res.redirect(req.session.redirect);
    }

    if (!req.query || !req.query.code) {

      return res.redirect(req.session.redirect);
    }

    oauth2.getOAuthAccessToken(req.query.code, {
      grant_type: 'authorization_code',
      redirect_uri: _c0nfig2.default.forge.oauth.redirectUri
    }, function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(err, access_token, refresh_token, results) {
        var forgeSvc, token;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                if (!err) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt('return', res.redirect(req.session.redirect));

              case 3:
                forgeSvc = _SvcManager2.default.getService('ForgeSvc');
                token = {
                  scope: _c0nfig2.default.forge.oauth.scope,
                  expires_in: results.expires_in,
                  refresh_token: refresh_token,
                  access_token: access_token
                };


                forgeSvc.set3LeggedTokenMaster(req.session, token);

                //const user = await forgeSvc.getUser(req.session)
                //
                //const userSvc = ServiceManager.getService(
                //  'UserSvc')

                // GDPR Modification
                //await userSvc.save(user)

                res.redirect(req.session.redirect);

                _context4.next = 12;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4['catch'](0);


                res.redirect(req.session.redirect);

              case 12:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this, [[0, 9]]);
      }));

      return function (_x7, _x8, _x9, _x10) {
        return _ref4.apply(this, arguments);
      };
    }());
  });

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  router.post('/callback/hooks', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var socketSvc, userId;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              socketSvc = _SvcManager2.default.getService('SocketSvc');
              userId = req.body.hook.createdBy;


              socketSvc.broadcastToUser(userId, 'forge.hook', req.body);

              res.status(200).end();

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function (_x11, _x12) {
      return _ref5.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // 3-legged token
  //
  /////////////////////////////////////////////////////////
  router.get('/token/3legged', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      var forgeSvc, scope, token;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context6.prev = 1;
              scope = ['viewables:read', 'data:write', 'data:read'];
              _context6.next = 5;
              return forgeSvc.get3LeggedTokenClient(req.session, scope);

            case 5:
              token = _context6.sent;


              res.json({
                expires_in: forgeSvc.getExpiry(token),
                access_token: token.access_token,
                scope: token.scope
              });

              _context6.next = 14;
              break;

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6['catch'](1);


              console.log(_context6.t0);
              res.status(_context6.t0.statusCode || 500);
              res.json(_context6.t0);

            case 14:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this, [[1, 9]]);
    }));

    return function (_x13, _x14) {
      return _ref6.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // 2-legged token
  //
  /////////////////////////////////////////////////////////
  router.get('/token/2legged', function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
      var forgeSvc, token;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context7.prev = 1;
              _context7.next = 4;
              return forgeSvc.request2LeggedToken('viewables:read');

            case 4:
              token = _context7.sent;


              res.json(token);

              _context7.next = 12;
              break;

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7['catch'](1);


              res.status(_context7.t0.statusCode || 500);
              res.json(_context7.t0);

            case 12:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this, [[1, 8]]);
    }));

    return function (_x15, _x16) {
      return _ref7.apply(this, arguments);
    };
  }());

  return router;
};