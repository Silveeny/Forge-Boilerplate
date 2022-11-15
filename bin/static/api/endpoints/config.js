'use strict';

var _SvcManager = require('../services/SvcManager');

var _SvcManager2 = _interopRequireDefault(_SvcManager);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

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
  // return sequences
  //
  /////////////////////////////////////////////////////////
  router.get('/:db/:modelId/sequences', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var db, modelSvc, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context.next = 5;
              return modelSvc.getConfigSequences(req.params.modelId);

            case 5:
              response = _context.sent;


              res.json(response);

              _context.next = 13;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](0);


              res.status(_context.t0.statusCode || 500);
              res.json(_context.t0);

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 9]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // add sequence
  //
  /////////////////////////////////////////////////////////
  router.post('/:db/:modelId/sequences', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var db, sequence, modelSvc, response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              db = req.params.db;
              sequence = req.body.sequence;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context2.next = 6;
              return modelSvc.addConfigSequence(req.params.modelId, sequence);

            case 6:
              response = _context2.sent;


              res.json(response);

              _context2.next = 14;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2['catch'](0);


              res.status(_context2.t0.statusCode || 500);
              res.json(_context2.t0);

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[0, 10]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // update sequence
  //
  /////////////////////////////////////////////////////////
  router.put('/:db/:modelId/sequences', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var db, sequence, modelSvc, response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              db = req.params.db;
              sequence = req.body.sequence;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context3.next = 6;
              return modelSvc.updateConfigSequence(req.params.modelId, sequence);

            case 6:
              response = _context3.sent;


              res.json(response);

              _context3.next = 14;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3['catch'](0);


              res.status(_context3.t0.statusCode || 500);
              res.json(_context3.t0);

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this, [[0, 10]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // delete sequence
  //
  /////////////////////////////////////////////////////////
  router.delete('/:db/:modelId/sequences/:sequenceId', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var db, modelSvc, response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context4.next = 5;
              return modelSvc.deleteConfigSequence(req.params.modelId, req.params.sequenceId);

            case 5:
              response = _context4.sent;


              res.json(response);

              _context4.next = 13;
              break;

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4['catch'](0);


              res.status(_context4.t0.statusCode || 500);
              res.json(_context4.t0);

            case 13:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this, [[0, 9]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // get states from specific sequence
  //
  /////////////////////////////////////////////////////////
  router.get('/:db/:modelId/sequences/:sequenceId/states', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var db, modelSvc, response;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context5.next = 5;
              return modelSvc.getConfigSequenceStates(req.params.modelId, req.params.sequenceId);

            case 5:
              response = _context5.sent;


              res.json(response);

              _context5.next = 13;
              break;

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5['catch'](0);


              res.status(_context5.t0.statusCode || 500);
              res.json(_context5.t0);

            case 13:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this, [[0, 9]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // add state to specific sequence.
  // body.state can be a single state or an array of states
  //
  /////////////////////////////////////////////////////////
  router.post('/:db/:modelId/sequences/:sequenceId/states', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      var db, state, modelSvc, response;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              db = req.params.db;
              state = req.body.state;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context6.next = 6;
              return modelSvc.addConfigSequenceStates(req.params.modelId, req.params.sequenceId, state);

            case 6:
              response = _context6.sent;


              res.json(response);

              _context6.next = 14;
              break;

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6['catch'](0);


              res.status(_context6.t0.statusCode || 500);
              res.json(_context6.t0);

            case 14:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this, [[0, 10]]);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // delete sequence state
  //
  /////////////////////////////////////////////////////////
  router.delete('/:db/:modelId/sequences/:sequenceId/states/:stateId', function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
      var db, modelSvc, response;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context7.next = 5;
              return modelSvc.deleteConfigSequenceState(req.params.modelId, req.params.sequenceId, req.params.stateId);

            case 5:
              response = _context7.sent;


              res.json(response);

              _context7.next = 13;
              break;

            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7['catch'](0);


              res.status(_context7.t0.statusCode || 500);
              res.json(_context7.t0);

            case 13:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this, [[0, 9]]);
    }));

    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());

  return router;
};