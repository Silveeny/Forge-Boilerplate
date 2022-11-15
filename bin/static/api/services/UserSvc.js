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

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserSvc = function (_BaseSvc) {
  _inherits(UserSvc, _BaseSvc);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function UserSvc(config) {
    _classCallCheck(this, UserSvc);

    return _possibleConstructorReturn(this, (UserSvc.__proto__ || Object.getPrototypeOf(UserSvc)).call(this, config));
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  _createClass(UserSvc, [{
    key: 'name',
    value: function name() {

      return 'UserSvc';
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getUploadLimit',
    value: function getUploadLimit(forgeUser) {

      var emailId = forgeUser.emailId;

      var matches = this._config.whiteList.filter(function (email) {
        return emailId.match(new RegExp(email));
      });

      return matches.length === 0 ? this._config.uploadLimit : undefined;
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getCurrentUser',
    value: function getCurrentUser(session) {
      var _this2 = this;

      return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
          var forgeSvc, forgeUser, uploadLimit, _user;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  forgeSvc = _SvcManager2.default.getService('ForgeSvc');
                  _context.next = 4;
                  return forgeSvc.getUser(session);

                case 4:
                  forgeUser = _context.sent;

                  if (!forgeUser) {
                    _context.next = 9;
                    break;
                  }

                  uploadLimit = _this2.getUploadLimit(forgeUser);
                  _user = Object.assign({}, forgeUser, {
                    uploadLimit: uploadLimit
                  });
                  return _context.abrupt('return', resolve(_user));

                case 9:
                  return _context.abrupt('return', resolve(null));

                case 12:
                  _context.prev = 12;
                  _context.t0 = _context['catch'](0);
                  return _context.abrupt('return', resolve(null));

                case 15:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2, [[0, 12]]);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getByUserId',
    value: function getByUserId(userId) {
      var _this3 = this;

      return new Promise(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
          var dbSvc, _user2;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this3._config.dbName);
                  _context2.next = 4;
                  return dbSvc.findOne(_this3._config.collection, {
                    fieldQuery: {
                      userId: userId
                    }
                  });

                case 4:
                  _user2 = _context2.sent;
                  return _context2.abrupt('return', resolve(_user2));

                case 8:
                  _context2.prev = 8;
                  _context2.t0 = _context2['catch'](0);
                  return _context2.abrupt('return', reject(_context2.t0));

                case 11:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this3, [[0, 8]]);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'save',
    value: function save(forgeUser) {
      var _this4 = this;

      return new Promise(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
          var dbSvc, uploadLimit, insertInfo, item, res;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this4._config.dbName);
                  uploadLimit = _this4.getUploadLimit(forgeUser);

                  // Autodesk accounts have unlimited uploads

                  insertInfo = Object.assign({}, { created: new Date() }, { uploadLimit: uploadLimit });
                  item = Object.assign({}, {
                    $setOnInsert: insertInfo,
                    $set: user
                  });
                  _context3.next = 7;
                  return dbSvc.upsert(_this4._config.collection, item, {
                    userId: user.userId
                  });

                case 7:
                  res = _context3.sent;
                  return _context3.abrupt('return', resolve(res));

                case 11:
                  _context3.prev = 11;
                  _context3.t0 = _context3['catch'](0);
                  return _context3.abrupt('return', reject(_context3.t0));

                case 14:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this4, [[0, 11]]);
        }));

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getActiveModels',
    value: function getActiveModels(collectionName, userId) {
      var _this5 = this;

      return new Promise(function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
          var dbSvc, models;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this5._config.dbName);
                  _context4.next = 4;
                  return dbSvc.getItems(collectionName, {
                    fieldQuery: {
                      owner: userId
                    },
                    pageQuery: {
                      model: 1,
                      name: 1
                    }
                  });

                case 4:
                  models = _context4.sent;
                  return _context4.abrupt('return', resolve(models));

                case 8:
                  _context4.prev = 8;
                  _context4.t0 = _context4['catch'](0);
                  return _context4.abrupt('return', reject(_context4.t0));

                case 11:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this5, [[0, 8]]);
        }));

        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'isModelOwner',
    value: function isModelOwner(collectionName, modelId, userId) {
      var _this6 = this;

      return new Promise(function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
          var dbSvc;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this6._config.dbName);
                  _context5.next = 4;
                  return dbSvc.findOne(collectionName, {
                    fieldQuery: {
                      _id: new _mongodb2.default.ObjectId(modelId),
                      owner: userId
                    },
                    pageQuery: {
                      model: 1,
                      name: 1
                    }
                  });

                case 4:
                  return _context5.abrupt('return', resolve(true));

                case 7:
                  _context5.prev = 7;
                  _context5.t0 = _context5['catch'](0);
                  return _context5.abrupt('return', _context5.t0.statusCode === 404 ? resolve(false) : reject(_context5.t0));

                case 10:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, _this6, [[0, 7]]);
        }));

        return function (_x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }());
    }
  }]);

  return UserSvc;
}(_BaseSvc3.default);

exports.default = UserSvc;