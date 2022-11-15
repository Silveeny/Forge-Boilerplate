'use strict';

var _SvcManager = require('../services/SvcManager');

var _SvcManager2 = _interopRequireDefault(_SvcManager);

var _c0nfig = require('c0nfig');

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

  /////////////////////////////////////////////////////////////////////////////
  // POST /message
  // Post socket message
  //
  /////////////////////////////////////////////////////////////////////////////
  router.post('/message', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var payload, socketSvc;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              try {
                payload = JSON.parse(req.body.payload);
                socketSvc = _SvcManager2.default.getService('SocketSvc');


                socketSvc.broadcast(payload.msgId, payload.msg, payload.filter);

                res.json(payload);
              } catch (ex) {

                res.status(ex.statusCode || 500);
                res.json(ex);
              }

            case 1:
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

  return router;
};