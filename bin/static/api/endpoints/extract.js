'use strict';

var _SvcManager = require('../services/SvcManager');

var _SvcManager2 = _interopRequireDefault(_SvcManager);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _c0nfig = require('c0nfig');

var _c0nfig2 = _interopRequireDefault(_c0nfig);

var _rmdir = require('rmdir');

var _rmdir2 = _interopRequireDefault(_rmdir);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function () {
  var _this = this;

  var router = _express2.default.Router();

  /////////////////////////////////////////////////////////
  // POST /
  //
  /////////////////////////////////////////////////////////
  router.post('/:modelId', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var modelId, modelSvc, dbModel, name, urn, forgeSvc, getToken, extractorSvc, dir, files, zipfile, socketSvc, msg;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              modelId = req.params.modelId;

              // supports extraction only for gallery models

              modelSvc = _SvcManager2.default.getService('gallery-ModelSvc');
              _context.next = 5;
              return modelSvc.getById(modelId);

            case 5:
              dbModel = _context.sent;


              res.json('processing');

              // name model to download
              name = dbModel.name;

              // URN of model to download

              urn = dbModel.model.urn;

              // Get Forge service

              forgeSvc = _SvcManager2.default.getService('ForgeSvc');

              // getToken async function

              getToken = function getToken() {
                return forgeSvc.get2LeggedToken();
              };

              // Get Extractor service


              extractorSvc = _SvcManager2.default.getService('ExtractorSvc');

              // target path to download SVF

              dir = _path2.default.resolve(__dirname, '../../../../TMP/' + modelId);

              // perform download

              _context.next = 15;
              return extractorSvc.download(getToken, urn, dir);

            case 15:
              files = _context.sent;


              // target zipfile
              zipfile = dir + '.zip';

              // zip all files

              _context.next = 19;
              return extractorSvc.createZip(dir, zipfile + '.tmp', name, files);

            case 19:

              _fs2.default.rename(zipfile + '.tmp', zipfile);

              // remove downloaded resources directory
              (0, _rmdir2.default)(dir);

              if (req.body.socketId) {
                socketSvc = _SvcManager2.default.getService('SocketSvc');
                msg = {
                  modelId: modelId
                };


                socketSvc.broadcast('extract.ready', msg, req.body.socketId);
              }

              _context.next = 28;
              break;

            case 24:
              _context.prev = 24;
              _context.t0 = _context['catch'](0);


              res.status(_context.t0.statusCode || 500);
              res.json(_context.t0);

            case 28:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 24]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /status/:name
  //
  /////////////////////////////////////////////////////////
  router.get('/status/:modelId', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var modelId, filename;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              modelId = req.params.modelId;
              filename = _path2.default.resolve(__dirname, '../../../../TMP/' + modelId + '.zip');
              _context2.next = 5;
              return _fs2.default.stat(filename);

            case 5:

              res.json('ok');

              _context2.next = 12;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2['catch'](0);


              res.status(404);
              res.json(_context2.t0);

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[0, 8]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /download/:name
  //
  /////////////////////////////////////////////////////////
  router.get('/download/:modelId', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var modelId, modelSvc, dbModel, name, filename;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              modelId = req.params.modelId;
              modelSvc = _SvcManager2.default.getService('gallery-ModelSvc');
              _context3.next = 5;
              return modelSvc.getById(modelId);

            case 5:
              dbModel = _context3.sent;
              name = dbModel.name;
              filename = _path2.default.resolve(__dirname, '../../../../TMP/' + modelId + '.zip');
              _context3.next = 10;
              return _fs2.default.stat(filename);

            case 10:

              res.download(filename, name + '.zip');

              _context3.next = 17;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3['catch'](0);


              res.status(404);
              res.json(_context3.t0);

            case 17:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this, [[0, 13]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  return router;
};