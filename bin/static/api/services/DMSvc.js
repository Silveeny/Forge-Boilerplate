'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SvcManager = require('./SvcManager');

var _SvcManager2 = _interopRequireDefault(_SvcManager);

var _BaseSvc2 = require('./BaseSvc');

var _BaseSvc3 = _interopRequireDefault(_BaseSvc2);

var _forgeApis = require('forge-apis');

var _forgeApis2 = _interopRequireDefault(_forgeApis);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DMSvc = function (_BaseSvc) {
  _inherits(DMSvc, _BaseSvc);

  _createClass(DMSvc, null, [{
    key: 'SERVICE_BASE_URL',
    get: function get() {

      return 'https://developer.api.autodesk.com/data/v1';
    }

    /////////////////////////////////////////////////////////////////
    // DataManagement Service
    //
    /////////////////////////////////////////////////////////////////

  }]);

  function DMSvc(config) {
    _classCallCheck(this, DMSvc);

    var _this = _possibleConstructorReturn(this, (DMSvc.__proto__ || Object.getPrototypeOf(DMSvc)).call(this, config));

    _this._projectsAPI = new _forgeApis2.default.ProjectsApi();
    _this._versionsAPI = new _forgeApis2.default.VersionsApi();
    _this._foldersAPI = new _forgeApis2.default.FoldersApi();
    _this._itemsAPI = new _forgeApis2.default.ItemsApi();
    _this._hubsAPI = new _forgeApis2.default.HubsApi();
    return _this;
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////


  _createClass(DMSvc, [{
    key: 'name',
    value: function name() {

      return 'DMSvc';
    }

    /////////////////////////////////////////////////////////////////
    // Returns hub info
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'getHubs',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(getToken) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context.next = 6;
                  break;
                }

                _context.next = 3;
                return getToken();

              case 3:
                _context.t0 = _context.sent;
                _context.next = 7;
                break;

              case 6:
                _context.t0 = getToken;

              case 7:
                token = _context.t0;
                return _context.abrupt('return', this._hubsAPI.getHubs(opts, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getHubs(_x5) {
        return _ref.apply(this, arguments);
      }

      return getHubs;
    }()

    /////////////////////////////////////////////////////////////////
    // Returns list of Hubs
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'getHub',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(getToken, hubId) {
        var token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 3;
                return getToken();

              case 3:
                _context2.t0 = _context2.sent;
                _context2.next = 7;
                break;

              case 6:
                _context2.t0 = getToken;

              case 7:
                token = _context2.t0;
                return _context2.abrupt('return', this._hubsAPI.getHub(hubId, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getHub(_x7, _x8) {
        return _ref2.apply(this, arguments);
      }

      return getHub;
    }()

    /////////////////////////////////////////////////////////////////
    // Returns list of Projects for specific Hub
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'getProjects',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(getToken, hubId) {
        var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var token;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 3;
                return getToken();

              case 3:
                _context3.t0 = _context3.sent;
                _context3.next = 7;
                break;

              case 6:
                _context3.t0 = getToken;

              case 7:
                token = _context3.t0;
                return _context3.abrupt('return', this._projectsAPI.getHubProjects(hubId, opts, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getProjects(_x9, _x10) {
        return _ref3.apply(this, arguments);
      }

      return getProjects;
    }()

    /////////////////////////////////////////////////////////////////
    // Returns Project content
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'getProject',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(getToken, hubId, projectId) {
        var token;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 3;
                return getToken();

              case 3:
                _context4.t0 = _context4.sent;
                _context4.next = 7;
                break;

              case 6:
                _context4.t0 = getToken;

              case 7:
                token = _context4.t0;
                return _context4.abrupt('return', this._projectsAPI.getProject(hubId, projectId, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getProject(_x12, _x13, _x14) {
        return _ref4.apply(this, arguments);
      }

      return getProject;
    }()

    /////////////////////////////////////////////////////////////////
    // Returns Project Top Folders
    // If the user has access to the project’s root folder,
    // it only returns details of the root folder.
    // If the user does not have access to the root folder,
    // it returns details of all the highest level folders in
    // the folder hierarchy the user has access to.
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'getProjectTopFolders',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(getToken, hubId, projectId) {
        var token;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context5.next = 6;
                  break;
                }

                _context5.next = 3;
                return getToken();

              case 3:
                _context5.t0 = _context5.sent;
                _context5.next = 7;
                break;

              case 6:
                _context5.t0 = getToken;

              case 7:
                token = _context5.t0;
                return _context5.abrupt('return', this._projectsAPI.getProjectTopFolders(hubId, projectId, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getProjectTopFolders(_x15, _x16, _x17) {
        return _ref5.apply(this, arguments);
      }

      return getProjectTopFolders;
    }()

    /////////////////////////////////////////////////////////////////
    // Returns Folder
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'getFolder',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(getToken, projectId, folderId) {
        var token;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 3;
                return getToken();

              case 3:
                _context6.t0 = _context6.sent;
                _context6.next = 7;
                break;

              case 6:
                _context6.t0 = getToken;

              case 7:
                token = _context6.t0;
                return _context6.abrupt('return', this._foldersAPI.getFolder(projectId, folderId, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getFolder(_x18, _x19, _x20) {
        return _ref6.apply(this, arguments);
      }

      return getFolder;
    }()

    /////////////////////////////////////////////////////////////////
    // Returns Folder content
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'getFolderContent',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(getToken, projectId, folderId) {
        var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var token;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context7.next = 6;
                  break;
                }

                _context7.next = 3;
                return getToken();

              case 3:
                _context7.t0 = _context7.sent;
                _context7.next = 7;
                break;

              case 6:
                _context7.t0 = getToken;

              case 7:
                token = _context7.t0;
                return _context7.abrupt('return', this._foldersAPI.getFolderContents(projectId, folderId, opts, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getFolderContent(_x21, _x22, _x23) {
        return _ref7.apply(this, arguments);
      }

      return getFolderContent;
    }()

    /////////////////////////////////////////////////////////////////
    // Returns Item details
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'getItem',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(getToken, projectId, itemId) {
        var token;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context8.next = 6;
                  break;
                }

                _context8.next = 3;
                return getToken();

              case 3:
                _context8.t0 = _context8.sent;
                _context8.next = 7;
                break;

              case 6:
                _context8.t0 = getToken;

              case 7:
                token = _context8.t0;
                return _context8.abrupt('return', this._itemsAPI.getItem(projectId, itemId, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getItem(_x25, _x26, _x27) {
        return _ref8.apply(this, arguments);
      }

      return getItem;
    }()

    /////////////////////////////////////////////////////////////////
    // Returns Item tip version (most recent)
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'getItemTip',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(getToken, projectId, itemId) {
        var token;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context9.next = 6;
                  break;
                }

                _context9.next = 3;
                return getToken();

              case 3:
                _context9.t0 = _context9.sent;
                _context9.next = 7;
                break;

              case 6:
                _context9.t0 = getToken;

              case 7:
                token = _context9.t0;
                return _context9.abrupt('return', this._itemsAPI.getItemTip(projectId, itemId, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getItemTip(_x28, _x29, _x30) {
        return _ref9.apply(this, arguments);
      }

      return getItemTip;
    }()

    /////////////////////////////////////////////////////////////////
    // Returns Versions for specific Item
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'getItemVersions',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(getToken, projectId, itemId) {
        var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var token;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context10.next = 6;
                  break;
                }

                _context10.next = 3;
                return getToken();

              case 3:
                _context10.t0 = _context10.sent;
                _context10.next = 7;
                break;

              case 6:
                _context10.t0 = getToken;

              case 7:
                token = _context10.t0;
                return _context10.abrupt('return', this._itemsAPI.getItemVersions(projectId, itemId, opts, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getItemVersions(_x31, _x32, _x33) {
        return _ref10.apply(this, arguments);
      }

      return getItemVersions;
    }()

    /////////////////////////////////////////////////////////////////
    // Delete Item
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'deleteItem',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(getToken, projectId, itemId) {
        var _this2 = this;

        var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt('return', new Promise(function () {
                  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(resolve, reject) {
                    var token, versionsRes, deleteTasks;
                    return regeneratorRuntime.wrap(function _callee11$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            _context11.prev = 0;

                            if (!(typeof getToken == 'function')) {
                              _context11.next = 7;
                              break;
                            }

                            _context11.next = 4;
                            return getToken();

                          case 4:
                            _context11.t0 = _context11.sent;
                            _context11.next = 8;
                            break;

                          case 7:
                            _context11.t0 = getToken;

                          case 8:
                            token = _context11.t0;
                            _context11.next = 11;
                            return _this2._itemsAPI.getItemVersions(projectId, itemId, opts, { autoRefresh: false }, token);

                          case 11:
                            versionsRes = _context11.sent;
                            deleteTasks = versionsRes.body.data.map(function (version) {

                              return _this2.deleteVersion(token, projectId, version.id);
                            });
                            return _context11.abrupt('return', Promise.all(deleteTasks));

                          case 16:
                            _context11.prev = 16;
                            _context11.t1 = _context11['catch'](0);


                            console.log(_context11.t1);
                            reject(_context11.t1);

                          case 20:
                          case 'end':
                            return _context11.stop();
                        }
                      }
                    }, _callee11, _this2, [[0, 16]]);
                  }));

                  return function (_x39, _x40) {
                    return _ref12.apply(this, arguments);
                  };
                }()));

              case 1:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function deleteItem(_x35, _x36, _x37) {
        return _ref11.apply(this, arguments);
      }

      return deleteItem;
    }()

    /////////////////////////////////////////////////////////////////
    // Returns Version for specific versionId
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'getVersion',
    value: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(getToken, projectId, versionId) {
        var token;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context13.next = 6;
                  break;
                }

                _context13.next = 3;
                return getToken();

              case 3:
                _context13.t0 = _context13.sent;
                _context13.next = 7;
                break;

              case 6:
                _context13.t0 = getToken;

              case 7:
                token = _context13.t0;
                return _context13.abrupt('return', this._versionsAPI.getVersion(projectId, versionId, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function getVersion(_x41, _x42, _x43) {
        return _ref13.apply(this, arguments);
      }

      return getVersion;
    }()

    /////////////////////////////////////////////////////////////////
    // Delete Version
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'deleteVersion',
    value: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(getToken, projectId, versionId) {
        var token, versionsRes, payload, url, headers;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;

                if (!(typeof getToken == 'function')) {
                  _context14.next = 7;
                  break;
                }

                _context14.next = 4;
                return getToken();

              case 4:
                _context14.t0 = _context14.sent;
                _context14.next = 8;
                break;

              case 7:
                _context14.t0 = getToken;

              case 8:
                token = _context14.t0;
                _context14.next = 11;
                return this._versionsAPI.getVersion(projectId, versionId, { autoRefresh: false }, token);

              case 11:
                versionsRes = _context14.sent;
                payload = this.createDeleteVersionPayload(versionsRes.body.data.relationships.item.data.id);

                //return this._versionsAPI.postVersion(
                //  projectId, JSON.stringify(payload),
                //  {autoRefresh:false}, token)

                url = DMSvc.SERVICE_BASE_URL + '/projects/' + (projectId + '/versions');
                headers = {
                  'Content-Type': 'application/vnd.api+json',
                  'Authorization': 'Bearer ' + token.access_token
                };
                return _context14.abrupt('return', requestAsync({
                  method: 'POST',
                  body: payload,
                  json: true,
                  headers: headers,
                  url: url
                }));

              case 18:
                _context14.prev = 18;
                _context14.t1 = _context14['catch'](0);


                Promise.reject(_context14.t1);

              case 21:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this, [[0, 18]]);
      }));

      function deleteVersion(_x44, _x45, _x46) {
        return _ref14.apply(this, arguments);
      }

      return deleteVersion;
    }()

    /////////////////////////////////////////////////////////////////
    // Creates new Storage location on OSS for DM
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'createStorage',
    value: function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(getToken, projectId, folderId, filename) {
        var token, payload, url, headers;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context15.next = 6;
                  break;
                }

                _context15.next = 3;
                return getToken();

              case 3:
                _context15.t0 = _context15.sent;
                _context15.next = 7;
                break;

              case 6:
                _context15.t0 = getToken;

              case 7:
                token = _context15.t0;
                payload = this.createStoragePayload(folderId, filename);

                //return this._projectsAPI.postStorage(
                //  projectId, JSON.stringify(payload),
                //  {autoRefresh:false}, token)

                url = DMSvc.SERVICE_BASE_URL + '/projects/' + (projectId + '/storage');
                headers = {
                  'Content-Type': 'application/vnd.api+json',
                  'Authorization': 'Bearer ' + token.access_token
                };
                return _context15.abrupt('return', requestAsync({
                  method: 'POST',
                  body: payload,
                  json: true,
                  headers: headers,
                  url: url
                }));

              case 12:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function createStorage(_x47, _x48, _x49, _x50) {
        return _ref15.apply(this, arguments);
      }

      return createStorage;
    }()

    /////////////////////////////////////////////////////////////////
    // Creates new Item
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'createItem',
    value: function () {
      var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(getToken, projectId, folderId, objectId, displayName) {
        var isBIM = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
        var token, payload, url, headers;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context16.next = 6;
                  break;
                }

                _context16.next = 3;
                return getToken();

              case 3:
                _context16.t0 = _context16.sent;
                _context16.next = 7;
                break;

              case 6:
                _context16.t0 = getToken;

              case 7:
                token = _context16.t0;
                payload = this.createItemPayload(folderId, objectId, displayName, isBIM);

                //return this._itemsAPI.postItem(
                //  projectId, JSON.stringify(payload),
                //  {autoRefresh:false}, token)

                url = DMSvc.SERVICE_BASE_URL + '/projects/' + (projectId + '/items');
                headers = {
                  'Content-Type': 'application/vnd.api+json',
                  'Authorization': 'Bearer ' + token.access_token
                };
                return _context16.abrupt('return', requestAsync({
                  method: 'POST',
                  body: payload,
                  json: true,
                  headers: headers,
                  url: url
                }));

              case 12:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function createItem(_x51, _x52, _x53, _x54, _x55) {
        return _ref16.apply(this, arguments);
      }

      return createItem;
    }()

    /////////////////////////////////////////////////////////////////
    // Creates new Version
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'createVersion',
    value: function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(getToken, projectId, itemId, objectId, displayName, isBIM) {
        var token, payload, url, headers;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context17.next = 6;
                  break;
                }

                _context17.next = 3;
                return getToken();

              case 3:
                _context17.t0 = _context17.sent;
                _context17.next = 7;
                break;

              case 6:
                _context17.t0 = getToken;

              case 7:
                token = _context17.t0;
                payload = this.createVersionPayload(itemId, objectId, displayName, isBIM);

                //return this._versionsAPI.postVersion(
                //  projectId, JSON.stringify(payload),
                //  {autoRefresh:false}, token)

                url = DMSvc.SERVICE_BASE_URL + '/projects/' + (projectId + '/versions');
                headers = {
                  'Content-Type': 'application/vnd.api+json',
                  'Authorization': 'Bearer ' + token.access_token
                };
                return _context17.abrupt('return', requestAsync({
                  method: 'POST',
                  body: payload,
                  json: true,
                  headers: headers,
                  url: url
                }));

              case 12:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function createVersion(_x57, _x58, _x59, _x60, _x61, _x62) {
        return _ref17.apply(this, arguments);
      }

      return createVersion;
    }()

    /////////////////////////////////////////////////////////////////
    // Get Item relationship References
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'getItemRelationshipsRefs',
    value: function () {
      var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(getToken, projectId, itemId) {
        var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var token;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context18.next = 6;
                  break;
                }

                _context18.next = 3;
                return getToken();

              case 3:
                _context18.t0 = _context18.sent;
                _context18.next = 7;
                break;

              case 6:
                _context18.t0 = getToken;

              case 7:
                token = _context18.t0;
                return _context18.abrupt('return', this._itemsAPI.getItemRelationshipsRefs(projectId, itemId, opts, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function getItemRelationshipsRefs(_x63, _x64, _x65) {
        return _ref18.apply(this, arguments);
      }

      return getItemRelationshipsRefs;
    }()

    /////////////////////////////////////////////////////////////////
    // Create Item relationship reference
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'createItemRelationshipRef',
    value: function () {
      var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(getToken, projectId, targetItemId, refVersionId) {
        var token, payload, url, headers;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context19.next = 6;
                  break;
                }

                _context19.next = 3;
                return getToken();

              case 3:
                _context19.t0 = _context19.sent;
                _context19.next = 7;
                break;

              case 6:
                _context19.t0 = getToken;

              case 7:
                token = _context19.t0;
                payload = this.createItemRelationshipRefPayload(refVersionId);

                //return this._itemsAPI.postItemRelationshipsRef(
                //  projectId, targetItemId, JSON.stringify(payload),
                //  {autoRefresh:false}, token)

                url = DMSvc.SERVICE_BASE_URL + '/projects/' + (projectId + '/items/' + targetItemId + '/') + 'relationships/refs';
                headers = {
                  'Content-Type': 'application/vnd.api+json',
                  'Authorization': 'Bearer ' + token.access_token
                };
                return _context19.abrupt('return', requestAsync({
                  method: 'POST',
                  body: payload,
                  json: true,
                  headers: headers,
                  url: url
                }));

              case 12:
              case 'end':
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function createItemRelationshipRef(_x67, _x68, _x69, _x70) {
        return _ref19.apply(this, arguments);
      }

      return createItemRelationshipRef;
    }()

    /////////////////////////////////////////////////////////////////
    // Get Version relationship references
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'getVersionRelationshipsRefs',
    value: function () {
      var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(getToken, projectId, versionId) {
        var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var token;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context20.next = 6;
                  break;
                }

                _context20.next = 3;
                return getToken();

              case 3:
                _context20.t0 = _context20.sent;
                _context20.next = 7;
                break;

              case 6:
                _context20.t0 = getToken;

              case 7:
                token = _context20.t0;
                return _context20.abrupt('return', this._versionsAPI.getVersionRelationshipsRefs(projectId, versionId, opts, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function getVersionRelationshipsRefs(_x71, _x72, _x73) {
        return _ref20.apply(this, arguments);
      }

      return getVersionRelationshipsRefs;
    }()

    /////////////////////////////////////////////////////////////////
    // Create Version relationship reference
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'createVersionRelationshipRef',
    value: function () {
      var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(getToken, projectId, targetVersionId, refVersionId) {
        var token, payload, url, headers;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context21.next = 6;
                  break;
                }

                _context21.next = 3;
                return getToken();

              case 3:
                _context21.t0 = _context21.sent;
                _context21.next = 7;
                break;

              case 6:
                _context21.t0 = getToken;

              case 7:
                token = _context21.t0;
                payload = this.createVersionRelationshipRefPayload(refVersionId);

                //return this._versionsAPI.postVersionRelationshipsRef(
                //  projectId, targetVersionId, JSON.stringify(payload),
                //  {autoRefresh:false}, token)

                url = DMSvc.SERVICE_BASE_URL + '/projects/' + (projectId + '/versions/' + targetVersionId + '/') + 'relationships/refs';
                headers = {
                  'Content-Type': 'application/vnd.api+json',
                  'Authorization': 'Bearer ' + token.access_token
                };
                return _context21.abrupt('return', requestAsync({
                  method: 'POST',
                  body: payload,
                  json: true,
                  headers: headers,
                  url: url
                }));

              case 12:
              case 'end':
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function createVersionRelationshipRef(_x75, _x76, _x77, _x78) {
        return _ref21.apply(this, arguments);
      }

      return createVersionRelationshipRef;
    }()

    /////////////////////////////////////////////////////////////////
    // Create new folder
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'createFolder',
    value: function () {
      var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(getToken, projectId, parentFolderId, folderName) {
        var token, url, payload, headers;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context22.next = 6;
                  break;
                }

                _context22.next = 3;
                return getToken();

              case 3:
                _context22.t0 = _context22.sent;
                _context22.next = 7;
                break;

              case 6:
                _context22.t0 = getToken;

              case 7:
                token = _context22.t0;
                url = DMSvc.SERVICE_BASE_URL + '/projects/' + (projectId + '/folders');
                payload = this.createFolderPayload(parentFolderId, folderName);
                headers = {
                  'Content-Type': 'application/vnd.api+json',
                  'Authorization': 'Bearer ' + token.access_token
                };
                return _context22.abrupt('return', requestAsync({
                  method: 'POST',
                  body: payload,
                  json: true,
                  headers: headers,
                  url: url
                }));

              case 12:
              case 'end':
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function createFolder(_x79, _x80, _x81, _x82) {
        return _ref22.apply(this, arguments);
      }

      return createFolder;
    }()

    /////////////////////////////////////////////////////////////////
    // Search folder
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'searchFolder',
    value: function () {
      var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(getToken, projectId, folderId, filter) {
        var token, url, headers;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                if (!(typeof getToken == 'function')) {
                  _context23.next = 6;
                  break;
                }

                _context23.next = 3;
                return getToken();

              case 3:
                _context23.t0 = _context23.sent;
                _context23.next = 7;
                break;

              case 6:
                _context23.t0 = getToken;

              case 7:
                token = _context23.t0;
                url = DMSvc.SERVICE_BASE_URL + '/projects/' + (projectId + '/folders/' + folderId + '/search?') + filter;
                headers = {
                  'Authorization': 'Bearer ' + token.access_token
                };
                return _context23.abrupt('return', requestAsync({
                  method: 'GET',
                  json: true,
                  headers: headers,
                  url: url
                }));

              case 11:
              case 'end':
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function searchFolder(_x83, _x84, _x85, _x86) {
        return _ref23.apply(this, arguments);
      }

      return searchFolder;
    }()

    /////////////////////////////////////////////////////////
    // Upload file and create new item or new version
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'upload',
    value: function upload(getToken, projectId, folderId, file, opts) {
      var _this3 = this;

      return new Promise(function () {
        var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(resolve, reject) {
          var displayName, storageRes, ossSvc, objectId, dmOpts, uploadRes;
          return regeneratorRuntime.wrap(function _callee25$(_context25) {
            while (1) {
              switch (_context25.prev = _context25.next) {
                case 0:
                  _context25.prev = 0;
                  displayName = file.originalname;
                  _context25.next = 4;
                  return _this3.createStorage(getToken, projectId, folderId, displayName);

                case 4:
                  storageRes = _context25.sent;
                  ossSvc = _SvcManager2.default.getService('OssSvc');
                  objectId = ossSvc.parseObjectId(storageRes.body.data.id);
                  dmOpts = Object.assign({}, opts, {
                    onComplete: function () {
                      var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(upload) {
                        var items, item, versionRes, response, itemRes, versions, _response;

                        return regeneratorRuntime.wrap(function _callee24$(_context24) {
                          while (1) {
                            switch (_context24.prev = _context24.next) {
                              case 0:
                                _context24.prev = 0;
                                _context24.next = 3;
                                return _this3.findItemsWithAttributes(getToken, projectId, folderId, {
                                  displayName: displayName
                                });

                              case 3:
                                items = _context24.sent;

                                if (!(items.length > 0)) {
                                  _context24.next = 13;
                                  break;
                                }

                                item = items[0];
                                _context24.next = 8;
                                return _this3.createVersion(getToken, projectId, item.id, storageRes.body.data.id, displayName, opts.isBIM);

                              case 8:
                                versionRes = _context24.sent;
                                response = {
                                  version: versionRes.body.data,
                                  storage: versionRes.body.data,
                                  item: item,
                                  upload: upload
                                };


                                opts.onComplete(response);

                                _context24.next = 21;
                                break;

                              case 13:
                                _context24.next = 15;
                                return _this3.createItem(getToken, projectId, folderId, storageRes.body.data.id, displayName, opts.isBIM);

                              case 15:
                                itemRes = _context24.sent;
                                _context24.next = 18;
                                return _this3.getItemVersions(getToken, projectId, itemRes.body.data.id);

                              case 18:
                                versions = _context24.sent;
                                _response = {
                                  version: versions.body.data[0],
                                  storage: storageRes.body.data,
                                  item: itemRes.body.data,
                                  upload: upload
                                };


                                opts.onComplete(_response);

                              case 21:
                                _context24.next = 26;
                                break;

                              case 23:
                                _context24.prev = 23;
                                _context24.t0 = _context24['catch'](0);


                                opts.onError(_context24.t0);

                              case 26:
                              case 'end':
                                return _context24.stop();
                            }
                          }
                        }, _callee24, _this3, [[0, 23]]);
                      }));

                      return function onComplete(_x89) {
                        return _ref25.apply(this, arguments);
                      };
                    }()
                  });
                  _context25.next = 10;
                  return ossSvc.uploadObjectChunked(getToken, objectId.bucketKey, objectId.objectKey, file, dmOpts);

                case 10:
                  uploadRes = _context25.sent;


                  resolve(uploadRes);

                  _context25.next = 17;
                  break;

                case 14:
                  _context25.prev = 14;
                  _context25.t0 = _context25['catch'](0);


                  reject(_context25.t0);

                case 17:
                case 'end':
                  return _context25.stop();
              }
            }
          }, _callee25, _this3, [[0, 14]]);
        }));

        return function (_x87, _x88) {
          return _ref24.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////////////
    // Returns Items matching search criteria
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'findItemsWithAttributes',
    value: function (_findItemsWithAttributes) {
      function findItemsWithAttributes(_x, _x2, _x3, _x4) {
        return _findItemsWithAttributes.apply(this, arguments);
      }

      findItemsWithAttributes.toString = function () {
        return _findItemsWithAttributes.toString();
      };

      return findItemsWithAttributes;
    }(function (getToken, projectId, folderId, attributes) {
      var _this4 = this;

      var recursive = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;


      return new Promise(function () {
        var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(resolve, reject) {
          var token, folderItems, tasks, items, filteredItems;
          return regeneratorRuntime.wrap(function _callee26$(_context26) {
            while (1) {
              switch (_context26.prev = _context26.next) {
                case 0:
                  _context26.prev = 0;

                  if (!(typeof getToken == 'function')) {
                    _context26.next = 7;
                    break;
                  }

                  _context26.next = 4;
                  return getToken();

                case 4:
                  _context26.t0 = _context26.sent;
                  _context26.next = 8;
                  break;

                case 7:
                  _context26.t0 = getToken;

                case 8:
                  token = _context26.t0;
                  _context26.next = 11;
                  return _this4.getFolderContent(token, projectId, folderId);

                case 11:
                  folderItems = _context26.sent;
                  tasks = folderItems.body.data.map(function (folderItem) {

                    if (folderItem.type === 'items') {

                      var match = true;

                      for (var key in attributes) {

                        if (attributes[key] !== folderItem.attributes[key]) {

                          match = false;
                        }
                      }

                      if (match) {

                        return Promise.resolve(folderItem);
                      } else {

                        return Promise.resolve(null);
                      }
                    } else if (folderItem.type === 'folders' && recursive) {

                      return findItemsWithAttributes(token, projectId, folderItem.id, recursive);
                    } else {

                      return Promise.resolve(null);
                    }
                  });
                  _context26.next = 15;
                  return Promise.all(tasks);

                case 15:
                  items = _context26.sent;
                  filteredItems = items.filter(function (item) {
                    return item !== null;
                  });


                  resolve(filteredItems);

                  _context26.next = 23;
                  break;

                case 20:
                  _context26.prev = 20;
                  _context26.t1 = _context26['catch'](0);


                  reject(_context26.t1);

                case 23:
                case 'end':
                  return _context26.stop();
              }
            }
          }, _callee26, _this4, [[0, 20]]);
        }));

        return function (_x91, _x92) {
          return _ref26.apply(this, arguments);
        };
      }());
    })

    /////////////////////////////////////////////////////////////////
    // Creates storage payload
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'createStoragePayload',
    value: function createStoragePayload(folderId, filename) {

      var payload = {
        jsonapi: {
          version: '1.0'
        },
        data: {
          type: 'objects',
          attributes: {
            name: filename
          },
          relationships: {
            target: {
              data: {
                type: 'folders',
                id: folderId
              }
            }
          }
        }
      };

      return payload;
    }

    /////////////////////////////////////////////////////////////////
    // Creates item payload
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'createItemPayload',
    value: function createItemPayload(folderId, objectId, displayName, isBIM) {

      var fileType = isBIM ? 'autodesk.bim360:File' : 'autodesk.core:File';

      var payload = {
        jsonapi: {
          version: '1.0'
        },
        data: {
          type: 'items',
          attributes: {
            displayName: displayName,
            extension: {
              type: 'items:' + fileType,
              version: '1.0'
            }
          },
          relationships: {
            tip: {
              data: {
                type: 'versions', id: '1'
              }
            },
            parent: {
              data: {
                type: 'folders',
                id: folderId
              }
            }
          }
        },
        included: [{
          type: 'versions',
          id: '1',
          attributes: {
            name: displayName,
            extension: {
              type: 'versions:' + fileType,
              version: '1.0'
            }
          },
          relationships: {
            storage: {
              data: {
                type: 'objects',
                id: objectId
              }
            }
          }
        }]
      };

      return payload;
    }

    /////////////////////////////////////////////////////////////////
    // Creates version payload
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'createVersionPayload',
    value: function createVersionPayload(itemId, objectId, displayName, isBIM) {

      var fileType = isBIM ? 'autodesk.bim360:File' : 'autodesk.core:File';

      var payload = {
        jsonapi: {
          version: '1.0'
        },
        data: {
          type: 'versions',
          attributes: {
            name: displayName,
            extension: {
              type: 'versions:' + fileType,
              version: '1.0'
            }
          },
          relationships: {
            item: {
              data: {
                type: 'items',
                id: itemId
              }
            },
            storage: {
              data: {
                type: 'objects',
                id: objectId
              }
            }
          }
        }
      };

      return payload;
    }

    /////////////////////////////////////////////////////////////////
    // Creates delete version payload
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'createDeleteVersionPayload',
    value: function createDeleteVersionPayload(itemId) {

      var payload = {
        jsonapi: {
          version: '1.0'
        },
        data: {
          type: 'versions',
          attributes: {
            name: 'max-delete.max',
            extension: {
              type: 'versions:autodesk.core:Deleted',
              version: '1.0'
            }
          },
          relationships: {
            item: {
              data: {
                type: 'items',
                id: itemId
              }
            }
          }
        }
      };

      return payload;
    }

    /////////////////////////////////////////////////////////////////
    // Creates item relationship payload
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'createItemRelationshipRefPayload',
    value: function createItemRelationshipRefPayload(refVersionId) {

      var payload = {
        jsonapi: {
          version: '1.0'
        },
        data: {
          type: 'versions',
          id: refVersionId,
          meta: {
            extension: {
              type: 'auxiliary:autodesk.core:Attachment',
              version: '1.0'
            }
          }
        }
      };

      return payload;
    }

    /////////////////////////////////////////////////////////////////
    // Creates version relationship payload
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'createVersionRelationshipRefPayload',
    value: function createVersionRelationshipRefPayload(refVersionId) {

      var payload = {
        jsonapi: {
          version: '1.0'
        },
        data: {
          type: 'versions',
          id: refVersionId,
          meta: {
            extension: {
              type: 'auxiliary:autodesk.core:Attachment',
              version: '1.0'
            }
          }
        }
      };

      return payload;
    }

    /////////////////////////////////////////////////////////////////
    // Creates new folder payload
    //
    /////////////////////////////////////////////////////////////////

  }, {
    key: 'createFolderPayload',
    value: function createFolderPayload(parentFolderId, folderName) {

      var payload = {
        jsonapi: {
          version: '1.0'
        },
        data: {
          type: 'folders',
          attributes: {
            name: folderName,
            extension: {
              type: 'folders:autodesk.core:Folder',
              version: '1.0'
            }
          },
          relationships: {
            parent: {
              data: {
                type: 'folders',
                id: parentFolderId
              }
            }
          }
        }
      };

      return payload;
    }
  }]);

  return DMSvc;
}(_BaseSvc3.default);

/////////////////////////////////////////////////////////////////
// Utils
//
/////////////////////////////////////////////////////////////////


exports.default = DMSvc;
function requestAsync(params) {

  return new Promise(function (resolve, reject) {

    (0, _request2.default)({

      url: params.url,
      method: params.method || 'GET',
      headers: params.headers || {
        'Authorization': 'Bearer ' + params.token
      },
      agentOptions: {
        secureProtocol: 'TLSv1_2_method' // 'TLSv1.2'
      },
      json: params.json,
      body: params.body

    }, function (err, response, body) {

      try {

        if (err) {

          console.log('error: ' + params.url);
          console.log(err);

          return reject(err);
        }

        if (body && body.errors) {

          console.log('body error: ' + params.url);
          console.log(body.errors);

          var error = Array.isArray(body.errors) ? body.errors[0] : body.errors;

          return reject(error);
        }

        if (response && [200, 201, 202].indexOf(response.statusCode) < 0) {

          console.log('status error: ' + response.statusCode);

          console.log(response.statusMessage);

          return reject(response.statusMessage);
        }

        return resolve({ body: body });
      } catch (ex) {

        console.log(params.url);
        console.log(ex);

        return reject(ex);
      }
    });
  });
}