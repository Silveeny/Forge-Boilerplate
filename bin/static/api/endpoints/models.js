'use strict';

var _SvcManager = require('../services/SvcManager');

var _SvcManager2 = _interopRequireDefault(_SvcManager);

var _sanitizeHtml = require('sanitize-html');

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _buffer = require('buffer');

var _c0nfig = require('c0nfig');

var _c0nfig2 = _interopRequireDefault(_c0nfig);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function () {
  var _this = this;

  /////////////////////////////////////////////////////////
  // Services
  //
  /////////////////////////////////////////////////////////
  var derivativesSvc = _SvcManager2.default.getService('DerivativesSvc');

  var uploadSvc = _SvcManager2.default.getService('UploadSvc');

  var forgeSvc = _SvcManager2.default.getService('ForgeSvc');

  var ossSvc = _SvcManager2.default.getService('OssSvc');

  var galleryConfig = _c0nfig2.default.gallery;

  /////////////////////////////////////////////////////////
  // initialize
  //
  /////////////////////////////////////////////////////////
  forgeSvc.get2LeggedToken().then(function (token) {

    ossSvc.getBucketDetails(token, galleryConfig.bucket.bucketKey).then(function () {}, function (error) {

      if (error.statusCode === 404) {

        ossSvc.createBucket(token, galleryConfig.bucket);
      }
    });
  });

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
  //
  //
  /////////////////////////////////////////////////////////
  var btoa = function btoa(str) {

    return new _buffer.Buffer(str).toString('base64').replace(new RegExp('=', 'g'), '');
  };

  var atob = function atob(b64Encoded) {

    return new _buffer.Buffer(b64Encoded, 'base64').toString();
  };

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  var postSVFJob = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {
      var bucketKey, objectKey, fileId, urn, socketSvc, jobId, input, job, modelInfo, modelSvc, res, msg, error, _msg2;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              bucketKey = _querystring2.default.escape(data.bucketKey);
              objectKey = _querystring2.default.escape(data.objectKey);
              fileId = 'urn:adsk.objects:os.object:' + bucketKey + '/' + objectKey;
              urn = btoa(fileId);
              socketSvc = _SvcManager2.default.getService('SocketSvc');
              jobId = guid();
              _context2.prev = 6;
              input = Object.assign({ urn: urn }, data.compressedUrn ? {
                compressedUrn: data.compressedUrn,
                rootFilename: data.rootFilename
              } : null);
              job = {
                input: input,
                output: {
                  force: true,
                  formats: [{
                    views: ['2d', '3d'],
                    type: 'svf'
                  }]
                }
              };
              _context2.next = 11;
              return derivativesSvc.postJobWithProgress(data.getToken, job, {
                waitResult: true,
                query: { outputType: 'svf' },
                onProgress: function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(progress) {
                    var filename, _msg;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:

                            if (data.socketId) {
                              filename = data.compressedUrn ? data.rootFilename : data.filename;
                              _msg = {
                                filename: filename,
                                progress: progress,
                                jobId: jobId
                              };


                              socketSvc.broadcast('svf.progress', _msg, data.socketId);
                            }

                          case 1:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function onProgress(_x3) {
                    return _ref2.apply(this, arguments);
                  };
                }()
              });

            case 11:
              modelInfo = {
                lifetime: galleryConfig.lifetime,
                name: (0, _sanitizeHtml2.default)(data.name),
                env: 'AutodeskProduction',
                timestamp: new Date(),
                //owner: data.userId,
                model: {
                  objectKey: objectKey,
                  fileId: fileId,
                  urn: urn
                }
              };
              modelSvc = _SvcManager2.default.getService(data.db + '-ModelSvc');
              _context2.next = 15;
              return modelSvc.register(modelInfo);

            case 15:
              res = _context2.sent;
              msg = {
                filename: data.filename,
                modelId: res._id,
                jobId: jobId
              };


              socketSvc.broadcast('model.added', msg);

              _context2.next = 26;
              break;

            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2['catch'](6);


              // removes circular buffer
              error = Object.assign(_context2.t0, {
                parent: undefined
              });
              _msg2 = {
                filename: data.filename,
                jobId: jobId,
                error: error
              };


              socketSvc.broadcast('svf.error', _msg2);

              data.getToken().then(function (token) {
                ossSvc.deleteObject(token, bucketKey, objectKey);
              });

            case 26:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[6, 20]]);
    }));

    return function postSVFJob(_x2) {
      return _ref.apply(this, arguments);
    };
  }();

  /////////////////////////////////////////////////////////
  // Remove models which are too old
  //
  /////////////////////////////////////////////////////////
  var cleanModels = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(modelSvc) {
      var models;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return modelSvc.getModels();

            case 2:
              models = _context3.sent;


              models.forEach(function (modelInfo) {

                if (modelInfo.lifetime) {

                  var now = new Date();

                  var age = (now - modelInfo.timestamp) / 1000;

                  if (age > modelInfo.lifetime) {

                    deleteModel(modelSvc, modelInfo);
                  }
                }
              });

              setTimeout(function () {
                cleanModels(modelSvc);
              }, 1000 * 60 * 60); //Every hour

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function cleanModels(_x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  /////////////////////////////////////////////////////////
  // Remove DB models which are not on OSS
  // or have no geometry (extraction failed)
  //
  /////////////////////////////////////////////////////////
  var purgeDB = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(modelSvc) {
      var token, models;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return forgeSvc.get2LeggedToken();

            case 2:
              token = _context5.sent;
              _context5.next = 5;
              return modelSvc.getModels();

            case 5:
              models = _context5.sent;


              models.forEach(function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(modelInfo) {
                  var urn, fileId, objectId, res, manifest;
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.prev = 0;

                          if (!(modelInfo.env === 'Local')) {
                            _context4.next = 3;
                            break;
                          }

                          return _context4.abrupt('return');

                        case 3:
                          urn = modelInfo.model.urn;
                          fileId = atob(urn);
                          objectId = ossSvc.parseObjectId(fileId);
                          _context4.next = 8;
                          return ossSvc.getObjectDetails(token, objectId.bucketKey, objectId.objectKey);

                        case 8:
                          res = _context4.sent;
                          _context4.next = 11;
                          return derivativesSvc.getManifest(token, urn);

                        case 11:
                          manifest = _context4.sent;


                          if (!derivativesSvc.hasDerivative(manifest.body, { type: 'geometry' })) {

                            deleteModel(modelSvc, modelInfo);
                          }

                          _context4.next = 18;
                          break;

                        case 15:
                          _context4.prev = 15;
                          _context4.t0 = _context4['catch'](0);


                          if (_context4.t0.statusCode === 404) {

                            deleteModel(modelSvc, modelInfo);
                          }

                        case 18:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this, [[0, 15]]);
                }));

                return function (_x6) {
                  return _ref5.apply(this, arguments);
                };
              }());

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function purgeDB(_x5) {
      return _ref4.apply(this, arguments);
    };
  }();

  /////////////////////////////////////////////////////////
  // Remove OSS models which are not in the DB
  //
  /////////////////////////////////////////////////////////
  var purgeOSS = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(modelSvc) {
      var token, bucketKey, res;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return forgeSvc.get2LeggedToken();

            case 2:
              token = _context6.sent;
              bucketKey = galleryConfig.bucket.bucketKey;
              _context6.next = 6;
              return ossSvc.getObjects(token, bucketKey);

            case 6:
              res = _context6.sent;


              res.body.items.forEach(function (object) {

                var urn = btoa(object.objectId);

                var opts = {
                  fieldQuery: {
                    'model.urn': urn
                  },
                  pageQuery: {
                    name: 1
                  }
                };

                modelSvc.getModel(opts).then(function (model) {

                  //console.log(model.name)

                }, function () {

                  console.log('NOT FOUND: ' + object.objectKey);

                  ossSvc.deleteObject(token, bucketKey, object.objectKey);
                });
              });

            case 8:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    return function purgeOSS(_x7) {
      return _ref6.apply(this, arguments);
    };
  }();

  /////////////////////////////////////////////////////////
  // delete a model
  //
  /////////////////////////////////////////////////////////
  var deleteModel = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(modelSvc, modelInfo) {
      var token, modelId, urn, fileId, objectId, socketSvc, msg;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return forgeSvc.get2LeggedToken();

            case 2:
              token = _context7.sent;
              modelId = modelInfo._id;


              modelSvc.deleteModel(modelId);

              urn = modelInfo.model.urn;


              derivativesSvc.deleteManifest(token, urn);

              fileId = atob(urn);
              objectId = ossSvc.parseObjectId(fileId);


              ossSvc.deleteObject(token, objectId.bucketKey, objectId.objectKey);

              socketSvc = _SvcManager2.default.getService('SocketSvc');
              msg = {
                modelId: modelId,
                urn: urn
              };


              socketSvc.broadcast('model.deleted', msg);

            case 13:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this);
    }));

    return function deleteModel(_x8, _x9) {
      return _ref7.apply(this, arguments);
    };
  }();

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  _SvcManager2.default.on('service.register', function (svc) {

    if (svc.name() === 'gallery-ModelSvc') {

      cleanModels(svc);

      //purgeOSS(svc)
      //purgeDB(svc)
    }
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
  //
  //
  /////////////////////////////////////////////////////////
  var buildUserWhiteListQuery = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, inQuery) {
      var userSvc, user, emailId, funcDef;
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
              emailId = user ? user.emailId : '';
              funcDef = '\n        function () {\n          const allowed = this.whiteList.filter(\n            function(email){\n              return "' + emailId + '".match(new RegExp(email))\n            })\n          return (allowed.length > 0)\n        }';
              return _context8.abrupt('return', Object.assign({}, inQuery, {
                $or: [{ whiteList: null }, { $where: funcDef }]
              }));

            case 10:
              _context8.prev = 10;
              _context8.t0 = _context8['catch'](0);
              return _context8.abrupt('return', inQuery);

            case 13:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this, [[0, 10]]);
    }));

    return function buildUserWhiteListQuery(_x10, _x11) {
      return _ref8.apply(this, arguments);
    };
  }();

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  router.get('/:db', function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
      var db, modelSvc, fieldQuery, limit, skip, opts, response;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context9.next = 5;
              return buildUserWhiteListQuery(req, {
                private: null
              });

            case 5:
              fieldQuery = _context9.sent;


              if (req.query.search) {

                fieldQuery.name = {
                  $regex: new RegExp(req.query.search),
                  $options: 'i'
                };
              }

              limit = parseInt(req.query.limit || 100);
              skip = parseInt(req.query.offset || 0);
              opts = {
                fieldQuery: fieldQuery,
                pageQuery: {
                  extraModels: 1,
                  displayName: 1,
                  timestamp: 1,
                  lifetime: 1,
                  model: 1,
                  desc: 1,
                  path: 1,
                  name: 1,
                  urn: 1,
                  env: 1,
                  git: 1
                },
                sort: {
                  name: 1
                },
                limit: limit,
                skip: skip
              };
              _context9.next = 12;
              return modelSvc.getModels(opts);

            case 12:
              response = _context9.sent;


              res.json(response);

              _context9.next = 20;
              break;

            case 16:
              _context9.prev = 16;
              _context9.t0 = _context9['catch'](0);


              res.status(_context9.t0.statusCode || 500);
              res.json(_context9.t0);

            case 20:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, _this, [[0, 16]]);
    }));

    return function (_x12, _x13) {
      return _ref9.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  router.get('/:db/count', function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
      var db, modelSvc, fieldQuery, opts, models;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context10.next = 5;
              return buildUserWhiteListQuery(req, {
                private: null
              });

            case 5:
              fieldQuery = _context10.sent;


              if (req.query.search) {

                fieldQuery.name = {
                  $regex: new RegExp(req.query.search),
                  $options: 'i'
                };
              }

              opts = {
                fieldQuery: fieldQuery
              };
              _context10.next = 10;
              return modelSvc.getModels(opts);

            case 10:
              models = _context10.sent;


              res.json({
                count: models.length
              });

              _context10.next = 18;
              break;

            case 14:
              _context10.prev = 14;
              _context10.t0 = _context10['catch'](0);


              res.status(_context10.t0.statusCode || 500);
              res.json(_context10.t0);

            case 18:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, _this, [[0, 14]]);
    }));

    return function (_x14, _x15) {
      return _ref10.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  router.get('/:db/recents', function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
      var db, modelSvc, fieldQuery, limit, skip, opts, response;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context11.next = 5;
              return buildUserWhiteListQuery(req, {
                private: null
              });

            case 5:
              fieldQuery = _context11.sent;


              if (req.query.search) {

                fieldQuery.name = {
                  $regex: new RegExp(req.query.search),
                  $options: 'i'
                };
              }

              limit = parseInt(req.query.limit || 15);
              skip = parseInt(req.query.offset || 0);
              opts = {
                fieldQuery: fieldQuery,
                pageQuery: {
                  model: 1,
                  name: 1,
                  urn: 1
                },
                sort: {
                  _id: -1
                },
                limit: limit,
                skip: skip
              };
              _context11.next = 12;
              return modelSvc.getModels(opts);

            case 12:
              response = _context11.sent;


              res.json(response);

              _context11.next = 20;
              break;

            case 16:
              _context11.prev = 16;
              _context11.t0 = _context11['catch'](0);


              res.status(_context11.t0.statusCode || 500);
              res.json(_context11.t0);

            case 20:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, _this, [[0, 16]]);
    }));

    return function (_x16, _x17) {
      return _ref11.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  router.get('/:db/:modelId', function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
      var db, modelSvc, pageQuery, model, userSvc, user, allowed;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              pageQuery = {
                dynamicExtensions: 1,
                layout: 1,
                name: 1,
                model: 1,
                env: 1
              };
              _context12.next = 6;
              return modelSvc.getById(req.params.modelId, {
                pageQuery: pageQuery
              });

            case 6:
              model = _context12.sent;

              if (!model.whiteList) {
                _context12.next = 21;
                break;
              }

              userSvc = _SvcManager2.default.getService('UserSvc');
              _context12.next = 11;
              return userSvc.getCurrentUser(req.session);

            case 11:
              user = _context12.sent;

              if (user) {
                _context12.next = 17;
                break;
              }

              res.status(401);
              return _context12.abrupt('return', res.json('Unauthorized'));

            case 17:
              allowed = model.whiteList.filter(function (email) {

                return user.emailId.match(new RegExp(email));
              });

              if (allowed.length) {
                _context12.next = 21;
                break;
              }

              res.status(403);
              return _context12.abrupt('return', res.json('Forbidden'));

            case 21:

              res.json(model);

              _context12.next = 28;
              break;

            case 24:
              _context12.prev = 24;
              _context12.t0 = _context12['catch'](0);


              res.status(_context12.t0.statusCode || 500);
              res.json(_context12.t0);

            case 28:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, _this, [[0, 24]]);
    }));

    return function (_x18, _x19) {
      return _ref12.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /{collection}/model/{modelId}/thumbnail
  // Get model thumbnail
  //
  /////////////////////////////////////////////////////////
  router.get('/:db/:modelId/thumbnail', function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
      var db, modelSvc, model, img, _expire, options, token, _derivativesSvc, response, expire;

      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              db = req.params.db;
              modelSvc = _SvcManager2.default.getService(db + '-ModelSvc');
              _context13.next = 5;
              return modelSvc.getById(req.params.modelId);

            case 5:
              model = _context13.sent;

              if (!model.thumbnail) {
                _context13.next = 13;
                break;
              }

              img = new _buffer.Buffer(model.thumbnail, 'base64');
              _expire = new Date(Date.now() + 2592000000).toUTCString();


              res.setHeader('Cache-Control', 'public, max-age=2592000');
              res.setHeader('Expires', _expire);
              res.contentType('image/png');

              return _context13.abrupt('return', res.end(img, 'binary'));

            case 13:
              options = {
                height: req.query.size || 400,
                width: req.query.size || 400,
                guid: req.query.guid
              };
              _context13.next = 16;
              return forgeSvc.get2LeggedToken();

            case 16:
              token = _context13.sent;
              _derivativesSvc = _SvcManager2.default.getService('DerivativesSvc');
              _context13.next = 20;
              return _derivativesSvc.getThumbnail(token, model.model.urn, options);

            case 20:
              response = _context13.sent;
              expire = new Date(Date.now() + 2592000000).toUTCString();


              res.setHeader('Cache-Control', 'public, max-age=2592000');
              res.setHeader('Expires', expire);
              res.contentType('image/png');
              res.end(response, 'binary');

              _context13.next = 32;
              break;

            case 28:
              _context13.prev = 28;
              _context13.t0 = _context13['catch'](0);


              res.status(_context13.t0.statusCode || 404);
              res.json(_context13.t0);

            case 32:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, _this, [[0, 28]]);
    }));

    return function (_x20, _x21) {
      return _ref13.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // upload resource
  //
  /////////////////////////////////////////////////////////
  router.post('/:db', uploadSvc.uploader.single('model'), function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(req, res) {
      var userSvc, user, models, bucketKey, socketId, uploadId, file, objectKey, socketSvc, rootFilename, compressedUrn, name, opts, response;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;
              userSvc = _SvcManager2.default.getService('UserSvc');
              _context14.next = 4;
              return userSvc.getCurrentUser(req.session);

            case 4:
              user = _context14.sent;

              if (user) {
                _context14.next = 8;
                break;
              }

              res.status(401);
              return _context14.abrupt('return', res.json('Unauthorized'));

            case 8:
              _context14.next = 10;
              return userSvc.getActiveModels(_c0nfig2.default.database.models.gallery.collection, user.userId);

            case 10:
              models = _context14.sent;

              if (!(user.uploadLimit !== undefined && models.length >= user.uploadLimit)) {
                _context14.next = 14;
                break;
              }

              res.status(403);
              return _context14.abrupt('return', res.json('Forbidden: upload limit reached'));

            case 14:
              bucketKey = galleryConfig.bucket.bucketKey;
              socketId = req.body.socketId;
              uploadId = req.body.uploadId;
              file = req.file;
              objectKey = guid('xxxx-xxxx-xxxx') + _path2.default.extname(file.originalname);
              socketSvc = _SvcManager2.default.getService('SocketSvc');
              rootFilename = req.body.rootFilename;
              compressedUrn = !!rootFilename;
              name = rootFilename || _path2.default.parse(file.originalname).name;
              opts = {
                chunkSize: 5 * 1024 * 1024, //5MB chunks
                concurrentUploads: 3,
                onProgress: function onProgress(info) {

                  if (socketId) {

                    var msg = Object.assign({}, info, {
                      filename: file.originalname,
                      bucketKey: bucketKey,
                      objectKey: objectKey,
                      uploadId: uploadId
                    });

                    socketSvc.broadcast('upload.progress', msg, socketId);
                  }
                },
                onComplete: function onComplete() {

                  postSVFJob({
                    getToken: function getToken() {
                      return forgeSvc.get2LeggedToken();
                    },
                    filename: file.originalname,
                    userId: user.userId,
                    db: req.params.db,
                    compressedUrn: compressedUrn,
                    rootFilename: rootFilename,
                    bucketKey: bucketKey,
                    objectKey: objectKey,
                    socketId: socketId,
                    name: name
                  });
                },
                onError: function onError(error) {

                  if (socketId) {

                    var msg = {
                      filename: file.originalname,
                      uploadId: uploadId,
                      error: error
                    };

                    socketSvc.broadcast('upload.error', msg, socketId);
                  }
                }
              };
              _context14.next = 26;
              return ossSvc.uploadObjectChunked(function () {
                return forgeSvc.get2LeggedToken();
              }, bucketKey, objectKey, file, opts);

            case 26:
              response = _context14.sent;


              res.json(response);

              _context14.next = 34;
              break;

            case 30:
              _context14.prev = 30;
              _context14.t0 = _context14['catch'](0);


              res.status(_context14.t0.statusCode || 500);
              res.json(_context14.t0);

            case 34:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, _this, [[0, 30]]);
    }));

    return function (_x22, _x23) {
      return _ref14.apply(this, arguments);
    };
  }());

  return router;
};