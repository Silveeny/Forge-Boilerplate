'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseSvc2 = require('./BaseSvc');

var _BaseSvc3 = _interopRequireDefault(_BaseSvc2);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Philippe Leefsma 2016 - ADN/Developer Technical Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

var DbSvc = function (_BaseSvc) {
  _inherits(DbSvc, _BaseSvc);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function DbSvc(config) {
    _classCallCheck(this, DbSvc);

    var _this = _possibleConstructorReturn(this, (DbSvc.__proto__ || Object.getPrototypeOf(DbSvc)).call(this, config));

    _this._db = null;
    return _this;
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  _createClass(DbSvc, [{
    key: 'name',


    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////
    value: function name() {

      return this._config.dbName || 'MongoDbSvc';
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getConnectionURL',
    value: function getConnectionURL() {

      if (this._config.user.length && this._config.pass.length) {

        return _util2.default.format('mongodb://%s:%s@%s:%d/%s', this._config.user, this._config.pass, this._config.dbhost, this._config.port, this._config.dbName);
      } else {

        return _util2.default.format('mongodb://%s:%d/%s', this._config.dbhost, this._config.port, this._config.dbName);
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'connect',
    value: function connect() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {

        var url = _this2.getConnectionURL();

        var client = _mongodb2.default.MongoClient;

        client.connect(url, function (err, db) {

          if (err) {

            return reject(err);
          } else {

            _this2._db = db;

            return resolve(db);
          }
        });
      });
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getDb',
    value: function getDb() {
      var _this3 = this;

      return new Promise(function (resolve) {

        return _this3._db ? resolve(_this3._db) : _this3.connect();
      });
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getCollection',
    value: function getCollection(collectionName) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {

        _this4._db.collection(collectionName, function (err, collection) {

          return err ? reject(err) : resolve(collection);
        });
      });
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'insert',
    value: function insert(collectionName, item) {
      var _this5 = this;

      return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
          var collection;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _this5.getCollection(collectionName);

                case 3:
                  collection = _context.sent;


                  collection.insert(item, { w: 1 }, function (err, result) {

                    return err ? reject(err) : resolve(item);
                  });

                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context['catch'](0);


                  reject(_context.t0);

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this5, [[0, 7]]);
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
    key: 'findOne',
    value: function findOne(collectionName) {
      var _this6 = this;

      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      return new Promise(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
          var collection;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _this6.getCollection(collectionName);

                case 3:
                  collection = _context2.sent;


                  collection.findOne(opts.fieldQuery || {}, opts.pageQuery || {}, function (err, dbItem) {

                    if (err) {

                      return reject(err);
                    }

                    if (!dbItem) {

                      return reject({
                        statusCode: 404,
                        msg: 'Not Found'
                      });
                    }

                    return resolve(dbItem);
                  });

                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2['catch'](0);


                  reject(_context2.t0);

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this6, [[0, 7]]);
        }));

        return function (_x4, _x5) {
          return _ref2.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'findOrCreate',
    value: function findOrCreate(collectionName, item, query) {
      var _this7 = this;

      return new Promise(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
          var collection;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _this7.getCollection(collectionName);

                case 3:
                  collection = _context3.sent;


                  collection.findOne(query, {}, function (err, dbItem) {

                    if (err) {

                      return reject(err);
                    }

                    if (dbItem) {

                      return resolve(dbItem);
                    }

                    return _this7.insert(collectionName, item);
                  });

                  _context3.next = 10;
                  break;

                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3['catch'](0);


                  reject(_context3.t0);

                case 10:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this7, [[0, 7]]);
        }));

        return function (_x6, _x7) {
          return _ref3.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'update',
    value: function update(collectionName, item, query) {
      var _this8 = this;

      return new Promise(function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
          var collection;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return _this8.getCollection(collectionName);

                case 3:
                  collection = _context4.sent;


                  if (typeof item._id === 'string') {

                    item._id = new _mongodb2.default.ObjectId(item._id);
                  }

                  collection.update(query, item, function (err, res) {

                    return err ? reject(err) : resolve(item);
                  });

                  _context4.next = 11;
                  break;

                case 8:
                  _context4.prev = 8;
                  _context4.t0 = _context4['catch'](0);


                  reject(_context4.t0);

                case 11:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this8, [[0, 8]]);
        }));

        return function (_x8, _x9) {
          return _ref4.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'upsert',
    value: function upsert(collectionName, item, query) {
      var _this9 = this;

      return new Promise(function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
          var collection;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return _this9.getCollection(collectionName);

                case 3:
                  collection = _context5.sent;


                  if (typeof item._id === 'string') {

                    item._id = new _mongodb2.default.ObjectId(item._id);
                  }

                  collection.update(query, item, {
                    upsert: true,
                    new: true
                  }, function (err, res) {

                    return err ? reject(err) : resolve(res);
                  });

                  _context5.next = 11;
                  break;

                case 8:
                  _context5.prev = 8;
                  _context5.t0 = _context5['catch'](0);


                  reject(_context5.t0);

                case 11:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, _this9, [[0, 8]]);
        }));

        return function (_x10, _x11) {
          return _ref5.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'distinct',
    value: function distinct(collectionName, key) {
      var _this10 = this;

      return new Promise(function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, reject) {
          var collection;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.prev = 0;
                  _context6.next = 3;
                  return _this10.getCollection(collectionName);

                case 3:
                  collection = _context6.sent;


                  collection.distinct(key, function (err, values) {

                    return err ? reject(err) : resolve(values);
                  });

                  _context6.next = 10;
                  break;

                case 7:
                  _context6.prev = 7;
                  _context6.t0 = _context6['catch'](0);


                  reject(_context6.t0);

                case 10:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, _this10, [[0, 7]]);
        }));

        return function (_x12, _x13) {
          return _ref6.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getCursor',
    value: function getCursor(collectionName) {
      var _this11 = this;

      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      return new Promise(function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve, reject) {
          var collection, options, cursor;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.prev = 0;
                  _context7.next = 3;
                  return _this11.getCollection(collectionName);

                case 3:
                  collection = _context7.sent;
                  options = {
                    limit: opts.limit || 100,
                    sort: opts.sort || {},
                    skip: opts.skip || 0
                  };
                  cursor = collection.find(opts.fieldQuery || {}, opts.pageQuery || {}, options);
                  return _context7.abrupt('return', resolve(cursor));

                case 9:
                  _context7.prev = 9;
                  _context7.t0 = _context7['catch'](0);


                  reject(_context7.t0);

                case 12:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, _this11, [[0, 9]]);
        }));

        return function (_x15, _x16) {
          return _ref7.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getItems',
    value: function getItems(collectionName) {
      var _this12 = this;

      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      return new Promise(function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(resolve, reject) {
          var cursor;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.prev = 0;
                  _context8.next = 3;
                  return _this12.getCursor(collectionName, opts);

                case 3:
                  cursor = _context8.sent;


                  cursor.toArray(function (err, items) {

                    return err ? reject(err) : resolve(items);
                  });

                  _context8.next = 10;
                  break;

                case 7:
                  _context8.prev = 7;
                  _context8.t0 = _context8['catch'](0);
                  return _context8.abrupt('return', reject(_context8.t0));

                case 10:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, _this12, [[0, 7]]);
        }));

        return function (_x18, _x19) {
          return _ref8.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'dropCollection',
    value: function dropCollection(collectionName) {
      var _this13 = this;

      return new Promise(function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(resolve, reject) {
          var collection;
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return _this13.getCollection(collectionName);

                case 2:
                  collection = _context9.sent;


                  collection.drop(function (err, result) {

                    return err ? reject(err) : resolve(result);
                  });

                case 4:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, _this13);
        }));

        return function (_x20, _x21) {
          return _ref9.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'removeItems',
    value: function removeItems(collectionName, query) {
      var _this14 = this;

      return new Promise(function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(resolve, reject) {
          var collection;
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.next = 2;
                  return _this14.getCollection(collectionName);

                case 2:
                  collection = _context10.sent;


                  collection.remove(query, function (err, result) {

                    return err ? reject(err) : resolve(result);
                  });

                case 4:
                case 'end':
                  return _context10.stop();
              }
            }
          }, _callee10, _this14);
        }));

        return function (_x22, _x23) {
          return _ref10.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'config',
    get: function get() {

      return this._config;
    }
  }]);

  return DbSvc;
}(_BaseSvc3.default);

exports.default = DbSvc;