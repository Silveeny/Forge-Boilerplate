'use strict';

var _SvcManager = require('../services/SvcManager');

var _SvcManager2 = _interopRequireDefault(_SvcManager);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _c0nfig = require('c0nfig');

var _c0nfig2 = _interopRequireDefault(_c0nfig);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function () {
  var _this = this;

  var uploadSvc = _SvcManager2.default.getService('UploadSvc');

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
  // GET /hubs
  // Get all hubs
  //
  /////////////////////////////////////////////////////////
  router.get('/hubs', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var forgeSvc, token, dmSvc, response;
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
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context.next = 8;
              return dmSvc.getHubs(token);

            case 8:
              response = _context.sent;


              res.json(response);

              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](0);


              res.status(_context.t0.status || 500);
              res.json(_context.t0);

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 12]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /hubs/{hubId}
  // Get hub by id
  //
  /////////////////////////////////////////////////////////
  router.get('/hubs/:hubId', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var hubId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              hubId = req.params.hubId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context2.next = 5;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 5:
              token = _context2.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context2.next = 9;
              return dmSvc.getHub(token, hubId);

            case 9:
              response = _context2.sent;


              res.json(response);

              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2['catch'](0);


              res.status(_context2.t0.status || 500);
              res.json(_context2.t0);

            case 17:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[0, 13]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /hubs/{hubId}/projects
  // Get all hub projects
  //
  /////////////////////////////////////////////////////////
  router.get('/hubs/:hubId/projects', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var hubId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              hubId = req.params.hubId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context3.next = 5;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 5:
              token = _context3.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context3.next = 9;
              return dmSvc.getProjects(token, hubId);

            case 9:
              response = _context3.sent;


              res.json(response);

              _context3.next = 17;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3['catch'](0);


              res.status(_context3.t0.status || 500);
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

  /////////////////////////////////////////////////////////
  //  GET /hubds/{hubId}/projects/{projectId}
  //  Get project content
  //
  /////////////////////////////////////////////////////////
  router.get('/hubs/:hubId/projects/:projectId', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var hubId, projectId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              hubId = req.params.hubId;
              projectId = req.params.projectId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context4.next = 6;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 6:
              token = _context4.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context4.next = 10;
              return dmSvc.getProject(token, hubId, projectId);

            case 10:
              response = _context4.sent;


              res.json(response);

              _context4.next = 18;
              break;

            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4['catch'](0);


              res.status(_context4.t0.status || 500);
              res.json(_context4.t0);

            case 18:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this, [[0, 14]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  //  GET /hubds/{hubId}/projects/{projectId}
  //  Get project top folders
  //
  /////////////////////////////////////////////////////////
  router.get('/hubs/:hubId/projects/:projectId/topFolders', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var hubId, projectId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              hubId = req.params.hubId;
              projectId = req.params.projectId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context5.next = 6;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 6:
              token = _context5.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context5.next = 10;
              return dmSvc.getProjectTopFolders(token, hubId, projectId);

            case 10:
              response = _context5.sent;


              res.json(response);

              _context5.next = 18;
              break;

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5['catch'](0);


              res.status(_context5.t0.status || 500);
              res.json(_context5.t0);

            case 18:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this, [[0, 14]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /projects/{projectId}/folders/{folderId}
  // Get folder
  //
  /////////////////////////////////////////////////////////
  router.get('/projects/:projectId/folders/:folderId', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      var projectId, folderId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              projectId = req.params.projectId;
              folderId = req.params.folderId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context6.next = 6;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 6:
              token = _context6.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context6.next = 10;
              return dmSvc.getFolder(token, projectId, folderId);

            case 10:
              response = _context6.sent;


              res.json(response);

              _context6.next = 18;
              break;

            case 14:
              _context6.prev = 14;
              _context6.t0 = _context6['catch'](0);


              res.status(_context6.t0.status || 500);
              res.json(_context6.t0);

            case 18:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this, [[0, 14]]);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /projects/{projectId}/folders/{folderId}/content
  // Get folder content
  //
  /////////////////////////////////////////////////////////
  router.get('/projects/:projectId/folders/:folderId/content', function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
      var projectId, folderId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              projectId = req.params.projectId;
              folderId = req.params.folderId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context7.next = 6;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 6:
              token = _context7.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context7.next = 10;
              return dmSvc.getFolderContent(token, projectId, folderId);

            case 10:
              response = _context7.sent;


              res.json(response);

              _context7.next = 18;
              break;

            case 14:
              _context7.prev = 14;
              _context7.t0 = _context7['catch'](0);


              res.status(_context7.t0.status || 500);
              res.json(_context7.t0);

            case 18:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this, [[0, 14]]);
    }));

    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /projects/{projectId}/items/{itemId}
  // Get item details
  //
  /////////////////////////////////////////////////////////
  router.get('/projects/:projectId/items/:itemId', function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
      var projectId, itemId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              projectId = req.params.projectId;
              itemId = req.params.itemId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context8.next = 6;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 6:
              token = _context8.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context8.next = 10;
              return dmSvc.getItem(token, projectId, itemId);

            case 10:
              response = _context8.sent;


              res.json(response);

              _context8.next = 18;
              break;

            case 14:
              _context8.prev = 14;
              _context8.t0 = _context8['catch'](0);


              res.status(_context8.t0.status || 500);
              res.json(_context8.t0);

            case 18:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this, [[0, 14]]);
    }));

    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /project/{projectId}/items/{itemId}/versions
  // Get all item versions
  //
  /////////////////////////////////////////////////////////
  router.get('/projects/:projectId/items/:itemId/versions', function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
      var projectId, itemId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              projectId = req.params.projectId;
              itemId = req.params.itemId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context9.next = 6;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 6:
              token = _context9.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context9.next = 10;
              return dmSvc.getItemVersions(token, projectId, itemId);

            case 10:
              response = _context9.sent;


              res.json(response);

              _context9.next = 18;
              break;

            case 14:
              _context9.prev = 14;
              _context9.t0 = _context9['catch'](0);


              res.status(_context9.t0.status || 500);
              res.json(_context9.t0);

            case 18:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, _this, [[0, 14]]);
    }));

    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /project/{projectId}/items/{itemId}/tip
  // Get item tip version (most recent version)
  //
  /////////////////////////////////////////////////////////
  router.get('/projects/:projectId/items/:itemId/tip', function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
      var projectId, itemId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              projectId = req.params.projectId;
              itemId = req.params.itemId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context10.next = 6;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 6:
              token = _context10.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context10.next = 10;
              return dmSvc.getItemTip(token, projectId, itemId);

            case 10:
              response = _context10.sent;


              res.json(response);

              _context10.next = 18;
              break;

            case 14:
              _context10.prev = 14;
              _context10.t0 = _context10['catch'](0);


              res.status(_context10.t0.status || 500);
              res.json(_context10.t0);

            case 18:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, _this, [[0, 14]]);
    }));

    return function (_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // POST /dm/projects/:projectId/folders/:folderId
  // Upload file to DataManagement
  //
  /////////////////////////////////////////////////////////
  router.post('/projects/:projectId/folders/:folderId', uploadSvc.uploader.single('model'), function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
      var forgeSvc, dmSvc, rootFilename, projectId, folderId, socketId, uploadId, nodeId, hubId, file, getToken, hubRes, hubType, opts, response;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              dmSvc = _SvcManager2.default.getService('DMSvc');
              rootFilename = req.body.rootFilename;
              projectId = req.params.projectId;
              folderId = req.params.folderId;
              socketId = req.body.socketId;
              uploadId = req.body.uploadId;
              nodeId = req.body.nodeId;
              hubId = req.body.hubId;
              file = req.file;

              getToken = function getToken() {
                return forgeSvc.get3LeggedTokenMaster(req.session);
              };

              _context11.next = 14;
              return dmSvc.getHub(getToken, hubId);

            case 14:
              hubRes = _context11.sent;
              hubType = hubRes.body.data.attributes.extension.type;
              opts = {
                isBIM: hubType === 'hubs:autodesk.bim360:Account',
                rootFilename: rootFilename,
                chunkSize: 5 * 1024 * 1024,
                concurrentUploads: 3,
                onProgress: function onProgress(info) {

                  if (socketId) {

                    var socketSvc = _SvcManager2.default.getService('SocketSvc');

                    var msg = Object.assign({}, info, {
                      filename: file.originalname,
                      projectId: projectId,
                      folderId: folderId,
                      uploadId: uploadId,
                      nodeId: nodeId,
                      hubId: hubId
                    });

                    socketSvc.broadcast('upload.progress', msg, socketId);
                  }
                },
                onError: function onError(error) {

                  if (socketId) {

                    var socketSvc = _SvcManager2.default.getService('SocketSvc');

                    var dmError = {
                      projectId: projectId,
                      folderId: folderId,
                      nodeId: nodeId,
                      error: error,
                      hubId: hubId
                    };

                    socketSvc.broadcast('upload.error', dmError, socketId);
                  }
                },
                onComplete: function onComplete(msg) {

                  if (socketId) {

                    var socketSvc = _SvcManager2.default.getService('SocketSvc');

                    var dmMsg = Object.assign({}, msg, {
                      projectId: projectId,
                      folderId: folderId,
                      nodeId: nodeId,
                      hubId: hubId
                    });

                    socketSvc.broadcast('dm.upload.complete', dmMsg, socketId);
                  }
                }
              };
              _context11.next = 19;
              return dmSvc.upload(getToken, projectId, folderId, file, opts);

            case 19:
              response = _context11.sent;


              res.json(response);

              _context11.next = 28;
              break;

            case 23:
              _context11.prev = 23;
              _context11.t0 = _context11['catch'](0);


              console.log(_context11.t0);

              res.status(_context11.t0.status || 500);
              res.json(_context11.t0);

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
  // DELETE /project/{projectId}/items/{itemId}
  // Delete item
  //
  /////////////////////////////////////////////////////////
  router.delete('/projects/:projectId/items/:itemId', function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
      var projectId, itemId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              projectId = req.params.projectId;
              itemId = req.params.itemId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context12.next = 6;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 6:
              token = _context12.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context12.next = 10;
              return dmSvc.deleteItem(token, projectId, itemId);

            case 10:
              response = _context12.sent;


              res.json(response);

              _context12.next = 18;
              break;

            case 14:
              _context12.prev = 14;
              _context12.t0 = _context12['catch'](0);


              res.status(_context12.t0.status || 500);
              res.json(_context12.t0);

            case 18:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, _this, [[0, 14]]);
    }));

    return function (_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // DELETE /project/{projectId}/versions/{versionId}
  // Delete version
  //
  /////////////////////////////////////////////////////////
  router.delete('/projects/:projectId/versions/:versionId', function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
      var projectId, versionId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              projectId = req.params.projectId;
              versionId = req.params.versionId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context13.next = 6;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 6:
              token = _context13.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context13.next = 10;
              return dmSvc.deleteVersion(token, projectId, versionId);

            case 10:
              response = _context13.sent;


              res.json(response);

              _context13.next = 18;
              break;

            case 14:
              _context13.prev = 14;
              _context13.t0 = _context13['catch'](0);


              res.status(_context13.t0.status || 500);
              res.json(_context13.t0);

            case 18:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, _this, [[0, 14]]);
    }));

    return function (_x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /projects/{projectId}/versions/{versionId}
  // Get version by Id
  //
  /////////////////////////////////////////////////////////
  router.get('/projects/:projectId/versions/:versionId', function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(req, res) {
      var projectId, versionId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;
              projectId = req.params.projectId;
              versionId = req.params.versionId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context14.next = 6;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 6:
              token = _context14.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context14.next = 10;
              return dmSvc.getVersion(token, projectId, versionId);

            case 10:
              response = _context14.sent;


              res.json(response);

              _context14.next = 18;
              break;

            case 14:
              _context14.prev = 14;
              _context14.t0 = _context14['catch'](0);


              res.status(_context14.t0.status || 500);
              res.json(_context14.t0);

            case 18:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, _this, [[0, 14]]);
    }));

    return function (_x27, _x28) {
      return _ref14.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /project/{projectId}/items/{itemId}/relationships/refs
  // Get item relationship references
  //
  /////////////////////////////////////////////////////////
  router.get('/projects/:projectId/items/:itemId/relationships/refs', function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(req, res) {
      var projectId, itemId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.prev = 0;
              projectId = req.params.projectId;
              itemId = req.params.itemId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context15.next = 6;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 6:
              token = _context15.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context15.next = 10;
              return dmSvc.getItemRelationshipsRefs(token, projectId, itemId);

            case 10:
              response = _context15.sent;


              res.json(response);

              _context15.next = 18;
              break;

            case 14:
              _context15.prev = 14;
              _context15.t0 = _context15['catch'](0);


              res.status(_context15.t0.status || 500);
              res.json(_context15.t0);

            case 18:
            case 'end':
              return _context15.stop();
          }
        }
      }, _callee15, _this, [[0, 14]]);
    }));

    return function (_x29, _x30) {
      return _ref15.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /project/{projectId}/versions/{versionId}/relationships/refs
  // Get version relationship references
  //
  /////////////////////////////////////////////////////////
  router.get('/projects/:projectId/versions/:versionId/relationships/refs', function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(req, res) {
      var projectId, versionId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.prev = 0;
              projectId = req.params.projectId;
              versionId = req.params.versionId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context16.next = 6;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 6:
              token = _context16.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context16.next = 10;
              return dmSvc.getVersionRelationshipsRefs(token, projectId, versionId);

            case 10:
              response = _context16.sent;


              res.json(response);

              _context16.next = 18;
              break;

            case 14:
              _context16.prev = 14;
              _context16.t0 = _context16['catch'](0);


              res.status(_context16.t0.status || 500);
              res.json(_context16.t0);

            case 18:
            case 'end':
              return _context16.stop();
          }
        }
      }, _callee16, _this, [[0, 14]]);
    }));

    return function (_x31, _x32) {
      return _ref16.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // POST /project/{projectId}/items/{itemId}/relationships/refs
  // Create item relationship ref
  //
  /////////////////////////////////////////////////////////
  router.post('/projects/:projectId/items/:itemId/relationships/refs', function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(req, res) {
      var payload, projectId, itemId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.prev = 0;
              payload = JSON.parse(req.body.payload);
              projectId = req.params.projectId;
              itemId = req.params.itemId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context17.next = 7;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 7:
              token = _context17.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context17.next = 11;
              return dmSvc.createItemRelationshipRef(token, projectId, itemId, payload.refVersionId);

            case 11:
              response = _context17.sent;


              res.json(response);

              _context17.next = 19;
              break;

            case 15:
              _context17.prev = 15;
              _context17.t0 = _context17['catch'](0);


              res.status(_context17.t0.status || 500);
              res.json(_context17.t0);

            case 19:
            case 'end':
              return _context17.stop();
          }
        }
      }, _callee17, _this, [[0, 15]]);
    }));

    return function (_x33, _x34) {
      return _ref17.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // POST /project/{projectId}/versions/{versionId}/relationships/refs
  // Create version relationship ref
  //
  /////////////////////////////////////////////////////////
  router.post('/projects/:projectId/versions/:versionId/relationships/refs', function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(req, res) {
      var payload, projectId, versionId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.prev = 0;
              payload = JSON.parse(req.body.payload);
              projectId = req.params.projectId;
              versionId = req.params.versionId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context18.next = 7;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 7:
              token = _context18.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context18.next = 11;
              return dmSvc.createVersionRelationshipRef(token, projectId, versionId, payload.refVersionId);

            case 11:
              response = _context18.sent;


              res.json(response);

              _context18.next = 19;
              break;

            case 15:
              _context18.prev = 15;
              _context18.t0 = _context18['catch'](0);


              res.status(_context18.t0.status || 500);
              res.json(_context18.t0);

            case 19:
            case 'end':
              return _context18.stop();
          }
        }
      }, _callee18, _this, [[0, 15]]);
    }));

    return function (_x35, _x36) {
      return _ref18.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // POST /project/{projectId}/folders
  // Create new folder
  //
  /////////////////////////////////////////////////////////
  router.post('/projects/:projectId/folders', function () {
    var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(req, res) {
      var payload, projectId, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.prev = 0;
              payload = JSON.parse(req.body.payload);
              projectId = req.params.projectId;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context19.next = 6;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 6:
              token = _context19.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context19.next = 10;
              return dmSvc.createFolder(token, projectId, payload.parentFolderId, payload.folderName);

            case 10:
              response = _context19.sent;


              res.json(response);

              _context19.next = 18;
              break;

            case 14:
              _context19.prev = 14;
              _context19.t0 = _context19['catch'](0);


              res.status(_context19.t0.status || 500);
              res.json(_context19.t0);

            case 18:
            case 'end':
              return _context19.stop();
          }
        }
      }, _callee19, _this, [[0, 14]]);
    }));

    return function (_x37, _x38) {
      return _ref19.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /projects/:projectId/folders/:folderId/search/:filter
  // Search a folder
  //
  /////////////////////////////////////////////////////////
  router.get('/projects/:projectId/folders/:folderId/search/:filter', function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(req, res) {
      var projectId, folderId, filter, forgeSvc, token, dmSvc, response;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.prev = 0;
              projectId = req.params.projectId;
              folderId = req.params.folderId;
              filter = req.params.filter;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              _context20.next = 7;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 7:
              token = _context20.sent;
              dmSvc = _SvcManager2.default.getService('DMSvc');
              _context20.next = 11;
              return dmSvc.searchFolder(token, projectId, folderId, filter);

            case 11:
              response = _context20.sent;


              res.json(response);

              _context20.next = 19;
              break;

            case 15:
              _context20.prev = 15;
              _context20.t0 = _context20['catch'](0);


              res.status(_context20.t0.status || 500);
              res.json(_context20.t0);

            case 19:
            case 'end':
              return _context20.stop();
          }
        }
      }, _callee20, _this, [[0, 15]]);
    }));

    return function (_x39, _x40) {
      return _ref20.apply(this, arguments);
    };
  }());

  /////////////////////////////////////////////////////////
  // GET /buckets/:bucketKey/objects/:objectKey
  // Download an item version based on { bucketKey, objectKey }
  //
  /////////////////////////////////////////////////////////
  router.get('/buckets/:bucketKey/objects/:objectKey', function () {
    var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(req, res) {
      var bucketKey, objectKey, forgeSvc, ossSvc, token, details, size, object;
      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.prev = 0;
              bucketKey = req.params.bucketKey;
              objectKey = req.params.objectKey;
              forgeSvc = _SvcManager2.default.getService('ForgeSvc');
              ossSvc = _SvcManager2.default.getService('OssSvc');
              _context21.next = 7;
              return forgeSvc.get3LeggedTokenMaster(req.session);

            case 7:
              token = _context21.sent;
              _context21.next = 10;
              return ossSvc.getObjectDetails(token, bucketKey, objectKey);

            case 10:
              details = _context21.sent;
              size = details.body.size;
              _context21.next = 14;
              return ossSvc.getObject(token, bucketKey, objectKey);

            case 14:
              object = _context21.sent;


              res.set('Content-Length', size);

              res.end(object);

              _context21.next = 23;
              break;

            case 19:
              _context21.prev = 19;
              _context21.t0 = _context21['catch'](0);


              res.status(_context21.t0.status || 500);
              res.json(_context21.t0);

            case 23:
            case 'end':
              return _context21.stop();
          }
        }
      }, _callee21, _this, [[0, 19]]);
    }));

    return function (_x41, _x42) {
      return _ref21.apply(this, arguments);
    };
  }());

  return router;
};