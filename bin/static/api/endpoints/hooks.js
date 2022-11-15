'use strict';

var _SvcManager = require('../services/SvcManager');

var _SvcManager2 = _interopRequireDefault(_SvcManager);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

  /////////////////////////////////////////////////////////
  // GET /hooks
  // Get All Hooks
  //
  /////////////////////////////////////////////////////////
  router.get('/', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var forgeSvc, token, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context.next = 4;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 4:
              token = _context.sent;
              _context.next = 7;
              return forgeSvc.getHooks(token);

            case 7:
              response = _context.sent;


              res.json(response);

              _context.next = 15;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](0);


              res.status(_context.t0.statusCode || 500);
              res.json(_context.t0);

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 11]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /hooks/systems/systemId
  // Get System Hooks
  //
  /////////////////////////////////////////////////////////
  router.get('/systems/:systemId', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var systemId, forgeSvc, token, response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              systemId = req.params.systemId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context2.next = 5;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 5:
              token = _context2.sent;
              _context2.next = 8;
              return forgeSvc.getSystemHooks(token, systemId);

            case 8:
              response = _context2.sent;


              res.json(response);

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

  /////////////////////////////////////////////////////////
  // GET /hooks/systems/systemId/events/eventId
  // Get Event Hooks
  //
  /////////////////////////////////////////////////////////
  router.get('/systems/:systemId/events/:eventId', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var _req$params, systemId, eventId, forgeSvc, token, response;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _req$params = req.params, systemId = _req$params.systemId, eventId = _req$params.eventId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context3.next = 5;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 5:
              token = _context3.sent;
              _context3.next = 8;
              return forgeSvc.getEventHooks(token, systemId, eventId);

            case 8:
              response = _context3.sent;


              res.json(response);

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

  /////////////////////////////////////////////////////////
  // POST /hooks/systems/:systemId
  // Create System Hook
  //
  /////////////////////////////////////////////////////////
  router.post('/systems/:systemId', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var systemId, params, forgeSvc, token, response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              systemId = req.params.systemId;
              params = req.body;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context4.next = 6;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 6:
              token = _context4.sent;
              _context4.next = 9;
              return forgeSvc.createSystemHook(token, systemId, params);

            case 9:
              response = _context4.sent;


              res.json(response);

              _context4.next = 17;
              break;

            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4['catch'](0);


              res.status(_context4.t0.statusCode || 500);
              res.json(_context4.t0);

            case 17:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this, [[0, 13]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // POST /hooks/systems/:systemId/events/:eventId
  // Create Event Hook
  //
  /////////////////////////////////////////////////////////
  router.post('/systems/:systemId/events/:eventId', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var _req$params2, systemId, eventId, params, forgeSvc, token, response;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _req$params2 = req.params, systemId = _req$params2.systemId, eventId = _req$params2.eventId;
              params = req.body;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context5.next = 6;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 6:
              token = _context5.sent;
              _context5.next = 9;
              return forgeSvc.createEventHook(token, systemId, eventId, params);

            case 9:
              response = _context5.sent;


              res.json(response);

              _context5.next = 17;
              break;

            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5['catch'](0);


              res.status(_context5.t0.statusCode || 500);
              res.json(_context5.t0);

            case 17:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this, [[0, 13]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // DELETE /hooks/systems/:systemId/events/:eventId/:hookId
  // Delete Hook
  //
  /////////////////////////////////////////////////////////
  router.delete('/systems/:systemId/events/:eventId/:hookId', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      var _req$params3, systemId, eventId, hookId, forgeSvc, token, response;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _req$params3 = req.params, systemId = _req$params3.systemId, eventId = _req$params3.eventId, hookId = _req$params3.hookId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context6.next = 5;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 5:
              token = _context6.sent;
              _context6.next = 8;
              return forgeSvc.removeHook(token, systemId, eventId, hookId);

            case 8:
              response = _context6.sent;


              res.json(response);

              _context6.next = 16;
              break;

            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6['catch'](0);


              res.status(_context6.t0.statusCode || 500);
              res.json(_context6.t0);

            case 16:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this, [[0, 12]]);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());

  return router;
};