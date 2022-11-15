'use strict';

var _SvcManager = require('../services/SvcManager');

var _SvcManager2 = _interopRequireDefault(_SvcManager);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _json2csv = require('json2csv');

var _json2csv2 = _interopRequireDefault(_json2csv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _c0nfig = require('c0nfig');

var _c0nfig2 = _interopRequireDefault(_c0nfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function () {
  var _this = this;

  /////////////////////////////////////////////////////////
  // Services
  //
  /////////////////////////////////////////////////////////
  var uploadSvc = _SvcManager2.default.getService('UploadSvc');

  var forgeSvc = _SvcManager2.default.getService('ForgeSvc');

  var ossSvc = _SvcManager2.default.getService('OssSvc');

  var bucket = _c0nfig2.default.meta.bucket;

  /////////////////////////////////////////////////////////
  // initialize
  //
  /////////////////////////////////////////////////////////
  forgeSvc.get2LeggedToken().then(function (token) {

    ossSvc.getBucketDetails(token, bucket.bucketKey).then(function () {}, function (error) {

      if (error.statusCode === 404) {

        ossSvc.createBucket(token, bucket);
      }
    });
  });

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
  // Get all meta properties for model (debug only)
  //
  /////////////////////////////////////////////////////////
  router.get('/:db/:modelId/properties', function () {
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
              return modelSvc.getModelMetaProperties(req.params.modelId);

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
  // Get meta properties for specific dbId
  //
  /////////////////////////////////////////////////////////
  router.get('/:db/:modelId/:dbId/properties', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var db, modelSvc, response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context2.next = 5;
              return modelSvc.getNodeMetaProperties(req.params.modelId, req.params.dbId);

            case 5:
              response = _context2.sent;


              res.json(response);

              _context2.next = 13;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2['catch'](0);


              res.status(_context2.t0.statusCode || 500);
              res.json(_context2.t0);

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[0, 9]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // Get single meta property for specific metaId
  //
  /////////////////////////////////////////////////////////
  router.get('/:db/:modelId/properties/:metaId', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var db, modelSvc, response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context3.next = 5;
              return modelSvc.getNodeMetaProperty(req.params.modelId, req.params.metaId);

            case 5:
              response = _context3.sent;


              res.json(response);

              _context3.next = 13;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3['catch'](0);


              res.status(_context3.t0.statusCode || 500);
              res.json(_context3.t0);

            case 13:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this, [[0, 9]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // Get download link for specific fileId
  //
  /////////////////////////////////////////////////////////
  router.get('/:db/:modelId/download/:fileId', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var db, token, object, details;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              db = req.params.db;
              _context4.next = 4;
              return forgeSvc.get2LeggedToken();

            case 4:
              token = _context4.sent;
              _context4.next = 7;
              return ossSvc.getObject(token, bucket.bucketKey, req.params.fileId);

            case 7:
              object = _context4.sent;
              _context4.next = 10;
              return ossSvc.getObjectDetails(token, bucket.bucketKey, req.params.fileId);

            case 10:
              details = _context4.sent;


              res.set('Content-Lenght', details.body.size);
              res.end(object);

              _context4.next = 19;
              break;

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4['catch'](0);


              res.status(_context4.t0.statusCode || 500);
              res.json(_context4.t0);

            case 19:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this, [[0, 15]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // upload resource
  //
  /////////////////////////////////////////////////////////
  router.post('/:db/:modelId/resources/:resourceId', uploadSvc.uploader.single('metaFile'), function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var db, token, file, response;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              db = req.params.db;
              _context5.next = 4;
              return forgeSvc.get2LeggedToken();

            case 4:
              token = _context5.sent;
              file = req.file;
              _context5.next = 8;
              return ossSvc.uploadObject(token, bucket.bucketKey, req.params.resourceId, file);

            case 8:
              response = _context5.sent;


              res.json(response);

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

  /////////////////////////////////////////////////////////
  // delete resource
  //
  /////////////////////////////////////////////////////////
  router.delete('/:db/:modelId/resources/:resourceId', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      var db, token, response;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              db = req.params.db;
              _context6.next = 4;
              return forgeSvc.get2LeggedToken();

            case 4:
              token = _context6.sent;
              _context6.next = 7;
              return ossSvc.deleteObject(token, bucket.bucketKey, req.params.resourceId);

            case 7:
              response = _context6.sent;


              res.json(response);

              _context6.next = 15;
              break;

            case 11:
              _context6.prev = 11;
              _context6.t0 = _context6['catch'](0);


              res.status(_context6.t0.statusCode || 500);
              res.json(_context6.t0);

            case 15:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this, [[0, 11]]);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // add meta property
  //
  /////////////////////////////////////////////////////////
  router.post('/:db/:modelId/properties', function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
      var db, modelSvc, metaProperty, response;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              metaProperty = req.body.metaProperty;
              _context7.next = 6;
              return modelSvc.addNodeMetaProperty(req.params.modelId, metaProperty);

            case 6:
              response = _context7.sent;


              res.json(response);

              _context7.next = 14;
              break;

            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7['catch'](0);


              res.status(_context7.t0.statusCode || 500);
              res.json(_context7.t0);

            case 14:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this, [[0, 10]]);
    }));

    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // update meta property
  //
  /////////////////////////////////////////////////////////
  router.put('/:db/:modelId/properties', function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
      var db, modelSvc, metaProperty, response;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              metaProperty = req.body.metaProperty;
              _context8.next = 6;
              return modelSvc.updateNodeMetaProperty(req.params.modelId, metaProperty);

            case 6:
              response = _context8.sent;


              res.json(response);

              _context8.next = 14;
              break;

            case 10:
              _context8.prev = 10;
              _context8.t0 = _context8['catch'](0);


              res.status(_context8.t0.statusCode || 500);
              res.json(_context8.t0);

            case 14:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this, [[0, 10]]);
    }));

    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // delete meta property
  //
  /////////////////////////////////////////////////////////
  router.delete('/:db/:modelId/properties/:metaId', function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
      var modelId, metaId, db, modelSvc, metaProperty, token, response;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              modelId = req.params.modelId;
              metaId = req.params.metaId;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context9.next = 7;
              return modelSvc.getNodeMetaProperty(modelId, metaId);

            case 7:
              metaProperty = _context9.sent;

              if (!(metaProperty.metaType === 'File')) {
                _context9.next = 13;
                break;
              }

              _context9.next = 11;
              return forgeSvc.get2LeggedToken();

            case 11:
              token = _context9.sent;


              ossSvc.deleteObject(token, bucket.bucketKey, metaProperty.fileId);

            case 13:
              _context9.next = 15;
              return modelSvc.deleteNodeMetaProperty(modelId, metaId);

            case 15:
              response = _context9.sent;


              res.json(response);

              _context9.next = 23;
              break;

            case 19:
              _context9.prev = 19;
              _context9.t0 = _context9['catch'](0);


              res.status(_context9.t0.statusCode || 500);
              res.json(_context9.t0);

            case 23:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, _this, [[0, 19]]);
    }));

    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // delete all meta properties on node
  //
  /////////////////////////////////////////////////////////
  router.delete('/:db/:modelId/:dbId/properties', function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
      var modelId, dbId, db, modelSvc, metaProperties, tasks, response;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              modelId = req.params.modelId;
              dbId = req.params.dbId;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context10.next = 7;
              return modelSvc.getNodeMetaProperties(modelId, dbId);

            case 7:
              metaProperties = _context10.sent;
              tasks = metaProperties.map(function (metaProperty) {

                if (metaProperty.metaType === 'File') {

                  forgeSvc.get2LeggedToken().then(function (token) {

                    ossSvc.deleteObject(token, bucket.bucketKey, metaProperty.fileId);
                  });
                }

                return modelSvc.deleteNodeMetaProperty(modelId, metaProperty.id);
              });
              _context10.next = 11;
              return Promise.all(tasks);

            case 11:
              response = _context10.sent;


              res.json(response);

              _context10.next = 19;
              break;

            case 15:
              _context10.prev = 15;
              _context10.t0 = _context10['catch'](0);


              res.status(_context10.t0.statusCode || 500);
              res.json(_context10.t0);

            case 19:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, _this, [[0, 15]]);
    }));

    return function (_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // Export all meta properties for model
  //
  /////////////////////////////////////////////////////////
  router.get('/:db/:modelId/properties/export/:format', function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
      var modelId, format, db, modelSvc, properties, exportedProps, csv;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              modelId = req.params.modelId;
              format = req.params.format;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context11.next = 7;
              return modelSvc.getModelMetaProperties(modelId);

            case 7:
              properties = _context11.sent;
              _context11.t0 = format;
              _context11.next = _context11.t0 === 'json' ? 11 : _context11.t0 === 'csv' ? 15 : 19;
              break;

            case 11:
              exportedProps = properties.map(function (prop) {
                return {
                  displayCategory: prop.displayCategory,
                  displayValue: prop.displayValue,
                  displayName: prop.displayName,
                  externalId: prop.externalId,
                  component: prop.component,
                  metaType: prop.metaType,
                  filelink: prop.filelink,
                  filename: prop.filename,
                  link: prop.link
                };
              });


              res.header('Content-Type', 'application/json');
              res.send(JSON.stringify(exportedProps, null, 2));
              return _context11.abrupt('break', 21);

            case 15:
              csv = (0, _json2csv2.default)({
                fields: ['externalId', 'component', 'displayCategory', 'displayName', 'displayValue', 'metaType', 'filelink', 'filename', 'link'],
                data: properties
              });

              res.header('Content-Type', 'application/text');
              res.send(csv);
              return _context11.abrupt('break', 21);

            case 19:
              res.status(400);
              res.send('Invalid format: ' + format);

            case 21:
              _context11.next = 28;
              break;

            case 23:
              _context11.prev = 23;
              _context11.t1 = _context11['catch'](0);


              console.log(_context11.t1);

              res.status(_context11.t1.statusCode || 500);
              res.json(_context11.t1);

            case 28:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, _this, [[0, 23]]);
    }));

    return function (_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // search meta properties
  //
  /////////////////////////////////////////////////////////
  router.post('/:db/:modelId/search', function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
      var db, modelSvc, text, response;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              text = req.body.text;
              _context12.next = 6;
              return modelSvc.searchMetaProperties(req.params.modelId, {
                text: text
              });

            case 6:
              response = _context12.sent;


              res.json(response);

              _context12.next = 14;
              break;

            case 10:
              _context12.prev = 10;
              _context12.t0 = _context12['catch'](0);


              res.status(_context12.t0.statusCode || 500);
              res.json(_context12.t0);

            case 14:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, _this, [[0, 10]]);
    }));

    return function (_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }());

  return router;
};