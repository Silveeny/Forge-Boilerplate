'use strict';

var _SvcManager = require('../services/SvcManager');

var _SvcManager2 = _interopRequireDefault(_SvcManager);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _c0nfig = require('c0nfig');

var _c0nfig2 = _interopRequireDefault(_c0nfig);

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
  //
  //
  /////////////////////////////////////////////////////////
  var guid = function guid() {
    var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'xxxxxxxxxx';


    var d = new Date().getTime();

    var guid = format.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : r & 0x7 | 0x8).toString(16);
    });

    return guid;
  };

  /////////////////////////////////////////////////////////
  // GET /formats
  // Get supported formats
  //
  /////////////////////////////////////////////////////////
  router.get('/formats', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var forgeSvc, token, derivativesSvc, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context.next = 4;
              return forgeSvc.get2LeggedToken();

            case 4:
              token = _context.sent;
              derivativesSvc = _SvcManager2.default.getService('DerivativesSvc');
              _context.next = 8;
              return derivativesSvc.getFormats(token);

            case 8:
              response = _context.sent;


              res.json(response);

              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](0);


              res.status(_context.t0.statusCode || 500);
              res.json(_context.t0);

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 12]]);
    }));

    return function (_x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /metadata/{urn}
  // Get design metadata
  //
  /////////////////////////////////////////////////////////
  router.get('/metadata/:urn', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var urn, forgeSvc, token, derivativesSvc, response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              urn = req.params.urn;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context2.next = 5;
              return forgeSvc.get2LeggedToken();

            case 5:
              token = _context2.sent;
              derivativesSvc = _SvcManager2.default.getService('DerivativesSvc');
              _context2.next = 9;
              return derivativesSvc.getMetadata(token, urn);

            case 9:
              response = _context2.sent;


              res.json(response);

              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2['catch'](0);


              res.status(_context2.t0.statusCode || 500);
              res.json(_context2.t0);

            case 17:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[0, 13]]);
    }));

    return function (_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /manifest/{urn}
  // Get design manifest
  //
  /////////////////////////////////////////////////////////
  router.get('/manifest/:urn', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var urn, forgeSvc, token, derivativesSvc, response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              urn = req.params.urn;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context3.next = 5;
              return forgeSvc.get2LeggedToken();

            case 5:
              token = _context3.sent;
              derivativesSvc = _SvcManager2.default.getService('DerivativesSvc');
              _context3.next = 9;
              return derivativesSvc.getManifest(token, urn);

            case 9:
              response = _context3.sent;


              res.json(response);

              _context3.next = 17;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3['catch'](0);


              res.status(_context3.t0.statusCode || 500);
              res.json(_context3.t0);

            case 17:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this, [[0, 13]]);
    }));

    return function (_x6, _x7) {
      return _ref3.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /hierarchy/{urn}/{guid}
  // Get hierarchy for design
  //
  /////////////////////////////////////////////////////////
  router.get('/hierarchy/:urn/:guid', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var urn, _guid, forgeSvc, token, derivativesSvc, response;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              urn = req.params.urn;
              _guid = req.params.guid;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context4.next = 6;
              return forgeSvc.get2LeggedToken();

            case 6:
              token = _context4.sent;
              derivativesSvc = _SvcManager2.default.getService('DerivativesSvc');
              _context4.next = 10;
              return derivativesSvc.getHierarchy(token, urn, _guid);

            case 10:
              response = _context4.sent;


              res.json(response);

              _context4.next = 18;
              break;

            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4['catch'](0);


              res.status(_context4.t0.statusCode || 500);
              res.json(_context4.t0);

            case 18:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this, [[0, 14]]);
    }));

    return function (_x8, _x9) {
      return _ref4.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /properties/{urn}/{guid}
  // Get properties for design
  //
  /////////////////////////////////////////////////////////
  router.get('/properties/:urn/:guid', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var objectId, _guid2, urn, forgeSvc, token, derivativesSvc, response;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              objectId = req.query.objectId || null;
              _guid2 = req.params.guid;
              urn = req.params.urn;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context5.next = 7;
              return forgeSvc.get2LeggedToken();

            case 7:
              token = _context5.sent;
              derivativesSvc = _SvcManager2.default.getService('DerivativesSvc');
              _context5.next = 11;
              return derivativesSvc.getProperties(token, urn, _guid2, {
                objectId: objectId
              });

            case 11:
              response = _context5.sent;


              res.json(response);

              _context5.next = 19;
              break;

            case 15:
              _context5.prev = 15;
              _context5.t0 = _context5['catch'](0);


              res.status(_context5.t0.statusCode || 500);
              res.json(_context5.t0);

            case 19:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this, [[0, 15]]);
    }));

    return function (_x10, _x11) {
      return _ref5.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /download
  // Get download uri for derivative resource
  //
  /////////////////////////////////////////////////////////
  router.get('/download', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      var filename, derivativeUrn, base64, urn, forgeSvc, token, derivativesSvc, response;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              filename = req.query.filename || 'download';
              derivativeUrn = req.query.derivativeUrn;
              base64 = req.query.base64;
              urn = req.query.urn;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context6.next = 8;
              return forgeSvc.get2LeggedToken();

            case 8:
              token = _context6.sent;
              derivativesSvc = _SvcManager2.default.getService('DerivativesSvc');
              _context6.next = 12;
              return derivativesSvc.download(token, urn, derivativeUrn, {
                base64: base64
              });

            case 12:
              response = _context6.sent;


              res.set('Content-Type', 'application/octet-stream');

              res.set('Content-Disposition', 'attachment filename="' + filename + '"');

              res.end(response);

              _context6.next = 22;
              break;

            case 18:
              _context6.prev = 18;
              _context6.t0 = _context6['catch'](0);


              res.status(_context6.t0.statusCode || 500);
              res.json(_context6.t0);

            case 22:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this, [[0, 18]]);
    }));

    return function (_x12, _x13) {
      return _ref6.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /thumbnail/{urn}
  // Get design thumbnail
  //
  /////////////////////////////////////////////////////////
  router.get('/thumbnails/:urn', function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
      var urn, forgeSvc, token, options, derivativesSvc, response;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              urn = req.params.urn;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context7.next = 5;
              return forgeSvc.get2LeggedToken();

            case 5:
              token = _context7.sent;
              options = {
                height: req.query.size || 400,
                width: req.query.size || 400,
                base64: req.query.base64,
                guid: req.query.guid
              };
              derivativesSvc = _SvcManager2.default.getService('DerivativesSvc');
              _context7.next = 10;
              return derivativesSvc.getThumbnail(token, urn, options);

            case 10:
              response = _context7.sent;


              if (req.query.base64) {

                res.end(response);
              } else {

                res.contentType('image/png');
                res.end(response, 'binary');
              }

              _context7.next = 18;
              break;

            case 14:
              _context7.prev = 14;
              _context7.t0 = _context7['catch'](0);


              res.status(_context7.t0.statusCode || 500);
              res.json(_context7.t0);

            case 18:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this, [[0, 14]]);
    }));

    return function (_x14, _x15) {
      return _ref7.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // POST /job
  // Post a derivative job - generic
  //
  /////////////////////////////////////////////////////////
  router.post('/job/:db/:modelId', function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
      var userSvc, user, modelId, db, modelsConfig, modelSvc, dbModel, _req$body, job, socketId, forgeSvc, socketSvc, derivativesSvc, token, jobId, format, filename, response;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              userSvc = _SvcManager2.default.getService('UserSvc');
              _context8.next = 4;
              return userSvc.getCurrentUser(req.session);

            case 4:
              user = _context8.sent;

              if (user) {
                _context8.next = 8;
                break;
              }

              res.status(401);
              return _context8.abrupt('return', res.json('Unauthorized'));

            case 8:
              modelId = req.params.modelId;
              db = req.params.db;
              modelsConfig = _c0nfig2.default.database.models[db];

              if (modelsConfig) {
                _context8.next = 14;
                break;
              }

              res.status(404);
              return _context8.abrupt('return', res.json('Invalid collection'));

            case 14:
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context8.next = 17;
              return modelSvc.getModel({
                fieldQuery: {
                  _id: new _mongodb2.default.ObjectId(modelId)
                }
              });

            case 17:
              dbModel = _context8.sent;

              if (!(dbModel.owner !== user.userId)) {
                _context8.next = 21;
                break;
              }

              res.status(401);
              return _context8.abrupt('return', res.json('Unauthorized'));

            case 21:
              _req$body = req.body, job = _req$body.job, socketId = _req$body.socketId;

              if (!(job.input.urn !== dbModel.model.urn)) {
                _context8.next = 25;
                break;
              }

              res.status(401);
              return _context8.abrupt('return', res.json('Unauthorized'));

            case 25:
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              socketSvc = _SvcManager2.default.getService('SocketSvc');
              derivativesSvc = _SvcManager2.default.getService('DerivativesSvc');
              _context8.next = 30;
              return forgeSvc.get2LeggedToken();

            case 30:
              token = _context8.sent;
              jobId = guid();
              format = job.output.formats[0].type;
              filename = dbModel.name + '.' + format;
              _context8.next = 36;
              return derivativesSvc.postJobWithProgress(token, job, {
                query: {
                  outputType: format
                },
                onProgress: function onProgress(progress) {

                  socketSvc.broadcast('job.progress', {
                    progress: progress,
                    filename: filename,
                    jobId: jobId,
                    job: job
                  }, socketId);
                }
              });

            case 36:
              response = _context8.sent;


              res.json(response);

              _context8.next = 45;
              break;

            case 40:
              _context8.prev = 40;
              _context8.t0 = _context8['catch'](0);


              console.log(_context8.t0);

              res.status(_context8.t0.statusCode || 500);
              res.json(_context8.t0);

            case 45:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this, [[0, 40]]);
    }));

    return function (_x16, _x17) {
      return _ref8.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // DELETE /manifest/{urn}
  // Delete design manifest
  //
  /////////////////////////////////////////////////////////
  //router.delete('/manifest/:urn', async (req, res) => {
  //
  //  try {
  //
  //    const urn = req.params.urn
  //
  //    const token = await getToken(req.session)
  //
  //    const derivativesSvc = ServiceManager.getService(
  //      'DerivativesSvc')
  //
  //    const response =
  //      await derivativesSvc.deleteManifest(
  //        token, urn)
  //
  //    res.json(response)
  //
  //  } catch (ex) {
  //
  //    res.status(ex.statusCode || 500)
  //    res.json(ex)
  //  }
  //})

  return router;
};