'use strict';

var _SvcManager = require('../services/SvcManager');

var _SvcManager2 = _interopRequireDefault(_SvcManager);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _c0nfig = require('c0nfig');

var _c0nfig2 = _interopRequireDefault(_c0nfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function () {
  var _this = this;

  /////////////////////////////////////////////////////////
  //router
  //
  /////////////////////////////////////////////////////////
  var router = _express2.default.Router();

  /////////////////////////////////////////////////////////
  // Get user active models
  //
  /////////////////////////////////////////////////////////
  router.get('/:db/models', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var db, userSvc, user, models;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              db = req.params.db;
              userSvc = _SvcManager2.default.getService('UserSvc');
              _context.next = 5;
              return userSvc.getCurrentUser(req.session);

            case 5:
              user = _context.sent;

              if (user) {
                _context.next = 9;
                break;
              }

              res.status(401);
              return _context.abrupt('return', res.json('Unauthorized'));

            case 9:
              _context.next = 11;
              return userSvc.getActiveModels(_c0nfig2.default.database.models[db].collection, user.userId);

            case 11:
              models = _context.sent;


              res.json(models);

              _context.next = 19;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context['catch'](0);


              res.status(_context.t0.statusCode || 500);
              res.json(_context.t0);

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 15]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  return router;
};