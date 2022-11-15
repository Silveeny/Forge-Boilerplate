'use strict';

var _SvcManager = require('../services/SvcManager');

var _SvcManager2 = _interopRequireDefault(_SvcManager);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _c0nfig = require('c0nfig');

var _c0nfig2 = _interopRequireDefault(_c0nfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Philippe Leefsma 2014 - ADN/Developer Technical Services
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
/////////////////////////////////////////////////////////////////////////////////


module.exports = function () {
  var _this = this;

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  var router = _express2.default.Router();

  var shouldCompress = function shouldCompress(req, res) {
    return true;
  };

  router.use((0, _compression2.default)({
    filter: shouldCompress
  }));

  ///////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////
  var getToken = function getToken(req) {

    var forgeSvc = _SvcManager2.default.getService('ForgeSvc');

    switch (req.params.auth) {

      case '2legged':

        return forgeSvc.get2LeggedToken();

      case '3legged':

        return forgeSvc.get3LeggedTokenMaster(req.session);

      default:

        return Promise.reject({
          msg: 'Invalid auth parameter, must be [2legged, 3legged]',
          statusCode: 401
        });
    }
  };

  ///////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////
  router.get('/:auth/health', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var toolkitSvc, health;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              toolkitSvc = _SvcManager2.default.getService('AR-VR-ToolkitSvc');
              _context.next = 4;
              return toolkitSvc.getHealth();

            case 4:
              health = _context.sent;


              res.json(health);

              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);


              res.status(_context.t0.statusCode || 500);
              res.json(_context.t0);

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 8]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  ///////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////
  router.get('/:auth/manifest/:urn', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var toolkitSvc, token, urn, manifest;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              toolkitSvc = _SvcManager2.default.getService('AR-VR-ToolkitSvc');
              _context2.next = 4;
              return getToken(req);

            case 4:
              token = _context2.sent;
              urn = req.params.urn;
              _context2.next = 8;
              return toolkitSvc.getManifest(token.access_token, urn);

            case 8:
              manifest = _context2.sent;


              res.json(manifest);

              _context2.next = 16;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2['catch'](0);


              res.status(_context2.t0.statusCode || 500);
              res.json(_context2.t0);

            case 16:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[0, 12]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  ///////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////
  router.get('/:auth/:urn/scenes/:sceneId', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var toolkitSvc, token, _req$params, sceneId, urn, scene;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              toolkitSvc = _SvcManager2.default.getService('AR-VR-ToolkitSvc');
              _context3.next = 4;
              return getToken(req);

            case 4:
              token = _context3.sent;
              _req$params = req.params, sceneId = _req$params.sceneId, urn = _req$params.urn;
              _context3.next = 8;
              return toolkitSvc.getScene(token.access_token, urn, sceneId);

            case 8:
              scene = _context3.sent;


              res.json(scene);

              _context3.next = 16;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3['catch'](0);


              res.status(_context3.t0.statusCode || 500);
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

  ///////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////
  router.get('/:auth/projects/:projectId/versions/:versionId/scenes/:sceneId', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var toolkitSvc, token, _req$params2, projectId, sceneId, versionId, scene;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              toolkitSvc = _SvcManager2.default.getService('AR-VR-ToolkitSvc');
              _context4.next = 4;
              return getToken(req);

            case 4:
              token = _context4.sent;
              _req$params2 = req.params, projectId = _req$params2.projectId, sceneId = _req$params2.sceneId, versionId = _req$params2.versionId;
              _context4.next = 8;
              return toolkitSvc.getScene3Legged(token.access_token, projectId, versionId, sceneId);

            case 8:
              scene = _context4.sent;


              res.json(scene);

              _context4.next = 16;
              break;

            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4['catch'](0);


              res.status(_context4.t0.statusCode || 500);
              res.json(_context4.t0);

            case 16:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this, [[0, 12]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());

  ///////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////
  router.get('/:auth/:urn/instanceTree/:sceneId', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var toolkitSvc, token, _req$params3, sceneId, urn, instanceTree;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              toolkitSvc = _SvcManager2.default.getService('AR-VR-ToolkitSvc');
              _context5.next = 4;
              return getToken(req);

            case 4:
              token = _context5.sent;
              _req$params3 = req.params, sceneId = _req$params3.sceneId, urn = _req$params3.urn;
              _context5.next = 8;
              return toolkitSvc.getInstanceTree(token.access_token, urn, sceneId);

            case 8:
              instanceTree = _context5.sent;


              res.json(instanceTree);

              _context5.next = 16;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5['catch'](0);


              res.status(_context5.t0.statusCode || 500);
              res.json(_context5.t0);

            case 16:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this, [[0, 12]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());

  ///////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////
  router.put('/:auth/scenes', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      var toolkitSvc, token, auth, _req$body, sceneId, sceneDef, options, projectId, versionId, urn, scene2LeggedRes, scene3LeggedRes;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              toolkitSvc = _SvcManager2.default.getService('AR-VR-ToolkitSvc');
              _context6.next = 4;
              return getToken(req);

            case 4:
              token = _context6.sent;
              auth = req.params.auth;
              _req$body = req.body, sceneId = _req$body.sceneId, sceneDef = _req$body.sceneDef, options = _req$body.options, projectId = _req$body.projectId, versionId = _req$body.versionId, urn = _req$body.urn;
              _context6.t0 = auth;
              _context6.next = _context6.t0 === '2legged' ? 10 : _context6.t0 === '3legged' ? 14 : 18;
              break;

            case 10:
              _context6.next = 12;
              return toolkitSvc.createScene(token.access_token, urn, sceneId, sceneDef, options);

            case 12:
              scene2LeggedRes = _context6.sent;
              return _context6.abrupt('return', res.json(scene2LeggedRes));

            case 14:
              _context6.next = 16;
              return toolkitSvc.createScene3Legged(token.access_token, projectId, versionId, sceneId, sceneDef, options);

            case 16:
              scene3LeggedRes = _context6.sent;
              return _context6.abrupt('return', res.json(scene3LeggedRes));

            case 18:
              return _context6.abrupt('return', Promise.reject({
                msg: 'Invalid auth parameter, must be [2legged, 3legged]',
                statusCode: 401
              }));

            case 19:
              _context6.next = 25;
              break;

            case 21:
              _context6.prev = 21;
              _context6.t1 = _context6['catch'](0);


              res.status(_context6.t1.statusCode || 500);
              res.json(_context6.t1);

            case 25:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this, [[0, 21]]);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());

  ///////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////
  router.post('/:auth/scenes', function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
      var toolkitSvc, token, _req$body2, sceneId, urn, processRes;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              toolkitSvc = _SvcManager2.default.getService('AR-VR-ToolkitSvc');
              _context7.next = 4;
              return getToken(req);

            case 4:
              token = _context7.sent;
              _req$body2 = req.body, sceneId = _req$body2.sceneId, urn = _req$body2.urn;
              _context7.next = 8;
              return toolkitSvc.processScene(token.access_token, urn, sceneId);

            case 8:
              processRes = _context7.sent;
              return _context7.abrupt('return', res.json(processRes));

            case 12:
              _context7.prev = 12;
              _context7.t0 = _context7['catch'](0);


              res.status(_context7.t0.statusCode || 500);
              res.json(_context7.t0);

            case 16:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this, [[0, 12]]);
    }));

    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());

  ///////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////
  router.delete('/:auth/:urn/scenes/:sceneId', function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
      var toolkitSvc, token, _req$params4, urn, sceneId, deleteRes;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              toolkitSvc = _SvcManager2.default.getService('AR-VR-ToolkitSvc');
              _context8.next = 4;
              return getToken(req);

            case 4:
              token = _context8.sent;
              _req$params4 = req.params, urn = _req$params4.urn, sceneId = _req$params4.sceneId;
              _context8.next = 8;
              return toolkitSvc.deleteScene(token.access_token, urn, sceneId);

            case 8:
              deleteRes = _context8.sent;
              return _context8.abrupt('return', res.json(deleteRes));

            case 12:
              _context8.prev = 12;
              _context8.t0 = _context8['catch'](0);


              res.status(_context8.t0.statusCode || 500);
              res.json(_context8.t0);

            case 16:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this, [[0, 12]]);
    }));

    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }());

  ///////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////
  router.delete('/:auth/projects/:projectId/versions/:versionId/scenes/:sceneId', function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
      var toolkitSvc, token, _req$params5, projectId, versionId, sceneId, deleteRes;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              toolkitSvc = _SvcManager2.default.getService('AR-VR-ToolkitSvc');
              _context9.next = 4;
              return getToken(req);

            case 4:
              token = _context9.sent;
              _req$params5 = req.params, projectId = _req$params5.projectId, versionId = _req$params5.versionId, sceneId = _req$params5.sceneId;
              _context9.next = 8;
              return toolkitSvc.deleteScene3Legged(token.access_token, projectId, versionId, sceneId);

            case 8:
              deleteRes = _context9.sent;


              res.json(deleteRes);

              _context9.next = 16;
              break;

            case 12:
              _context9.prev = 12;
              _context9.t0 = _context9['catch'](0);


              res.status(_context9.t0.statusCode || 500);
              res.json(_context9.t0);

            case 16:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, _this, [[0, 12]]);
    }));

    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }());

  return router;
};