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

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModelSvc = function (_BaseSvc) {
  _inherits(ModelSvc, _BaseSvc);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ModelSvc(config) {
    _classCallCheck(this, ModelSvc);

    return _possibleConstructorReturn(this, (ModelSvc.__proto__ || Object.getPrototypeOf(ModelSvc)).call(this, config));
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  _createClass(ModelSvc, [{
    key: 'name',
    value: function name() {

      return this._config.name + '-ModelSvc' || 'ModelSvc';
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getById',
    value: function getById(modelId) {
      var _this2 = this;

      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
          var dbSvc, query, model;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this2._config.dbName);
                  query = Object.assign({}, opts, {
                    fieldQuery: {
                      _id: new _mongodb2.default.ObjectId(modelId)
                    }
                  });
                  _context.next = 5;
                  return dbSvc.findOne(_this2._config.collection, query);

                case 5:
                  model = _context.sent;
                  return _context.abrupt('return', resolve(model));

                case 9:
                  _context.prev = 9;
                  _context.t0 = _context['catch'](0);
                  return _context.abrupt('return', reject(_context.t0));

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2, [[0, 9]]);
        }));

        return function (_x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getModel',
    value: function getModel() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


      try {

        var dbSvc = _SvcManager2.default.getService(this._config.dbName);

        return dbSvc.findOne(this._config.collection, opts);
      } catch (ex) {

        return Promise.reject(ex);
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getModels',
    value: function getModels() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


      try {

        var dbSvc = _SvcManager2.default.getService(this._config.dbName);

        return dbSvc.getItems(this._config.collection, opts);
      } catch (ex) {

        return Promise.reject(ex);
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getThumbnails',
    value: function getThumbnails(modelIds) {
      var _this3 = this;

      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      return new Promise(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
          var dbSvc, query, models, thumbnails;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this3._config.dbName);
                  query = {
                    fieldQuery: {
                      $or: modelIds.map(function (id) {
                        return { _id: new _mongodb2.default.ObjectId(id) };
                      })
                    },
                    pageQuery: {
                      thumbnail: 1
                    }
                  };
                  _context2.next = 5;
                  return dbSvc.getItems(_this3._config.collection, Object.assign({}, opts, query));

                case 5:
                  models = _context2.sent;
                  thumbnails = modelIds.map(function (id) {

                    var mongoId = new _mongodb2.default.ObjectId(id);

                    return (0, _find2.default)(models, { _id: mongoId }).thumbnail;
                  });
                  return _context2.abrupt('return', resolve(thumbnails));

                case 10:
                  _context2.prev = 10;
                  _context2.t0 = _context2['catch'](0);
                  return _context2.abrupt('return', reject(_context2.t0));

                case 13:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this3, [[0, 10]]);
        }));

        return function (_x7, _x8) {
          return _ref2.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'register',
    value: function register(modelInfo) {

      try {

        var dbSvc = _SvcManager2.default.getService(this._config.dbName);

        return dbSvc.insert(this._config.collection, modelInfo);
      } catch (ex) {

        return Promise.reject(ex);
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'deleteModel',
    value: function deleteModel(modelId) {

      try {

        var dbSvc = _SvcManager2.default.getService(this._config.dbName);

        return dbSvc.removeItems(this._config.collection, {
          _id: new _mongodb2.default.ObjectId(modelId)
        });
      } catch (ex) {

        return Promise.reject(ex);
      }
    }

    /////////////////////////////////////////////////////////
    // returns config sequence by Id
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getConfigSequence',
    value: function getConfigSequence(modelId, sequenceId) {
      var _this4 = this;

      return new Promise(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
          var dbSvc, query, model;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this4._config.dbName);
                  query = {
                    fieldQuery: {
                      _id: new _mongodb2.default.ObjectId(modelId)
                    },
                    pageQuery: {
                      sequences: 1
                    }
                  };
                  _context3.next = 5;
                  return dbSvc.findOne(_this4._config.collection, query);

                case 5:
                  model = _context3.sent;
                  return _context3.abrupt('return', resolve(model.sequences || []));

                case 9:
                  _context3.prev = 9;
                  _context3.t0 = _context3['catch'](0);
                  return _context3.abrupt('return', reject(_context3.t0));

                case 12:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this4, [[0, 9]]);
        }));

        return function (_x9, _x10) {
          return _ref3.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // returns config sequences
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getConfigSequences',
    value: function getConfigSequences(modelId) {
      var _this5 = this;

      return new Promise(function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
          var dbSvc, query, model;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this5._config.dbName);
                  query = {
                    fieldQuery: {
                      _id: new _mongodb2.default.ObjectId(modelId)
                    },
                    pageQuery: {
                      sequences: 1
                    }
                  };
                  _context4.next = 5;
                  return dbSvc.findOne(_this5._config.collection, query);

                case 5:
                  model = _context4.sent;
                  return _context4.abrupt('return', resolve(model.sequences || []));

                case 9:
                  _context4.prev = 9;
                  _context4.t0 = _context4['catch'](0);
                  return _context4.abrupt('return', reject(_context4.t0));

                case 12:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this5, [[0, 9]]);
        }));

        return function (_x11, _x12) {
          return _ref4.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // add new config sequence
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'addConfigSequence',
    value: function addConfigSequence(modelId, sequence) {
      var _this6 = this;

      return new Promise(function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
          var dbSvc, collection;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this6._config.dbName);
                  _context5.next = 4;
                  return dbSvc.getCollection(_this6._config.collection);

                case 4:
                  collection = _context5.sent;


                  collection.update({
                    '_id': new _mongodb2.default.ObjectID(modelId)
                  }, {
                    $push: {
                      'sequences': sequence
                    }
                  }, function (err) {

                    return err ? reject(err) : resolve(sequence);
                  });

                  _context5.next = 11;
                  break;

                case 8:
                  _context5.prev = 8;
                  _context5.t0 = _context5['catch'](0);
                  return _context5.abrupt('return', reject(_context5.t0));

                case 11:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, _this6, [[0, 8]]);
        }));

        return function (_x13, _x14) {
          return _ref5.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // update existing config sequence
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'updateConfigSequence',
    value: function updateConfigSequence(modelId, sequence) {
      var _this7 = this;

      return new Promise(function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, reject) {
          var dbSvc, collection;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this7._config.dbName);
                  _context6.next = 4;
                  return dbSvc.getCollection(_this7._config.collection);

                case 4:
                  collection = _context6.sent;


                  collection.update({
                    '_id': new _mongodb2.default.ObjectID(modelId),
                    'sequences.id': sequence.id
                  }, {
                    $set: {
                      'sequences.$.stateIds': sequence.stateIds
                    }
                  }, function (err) {

                    return err ? reject(err) : resolve(sequence);
                  });

                  _context6.next = 11;
                  break;

                case 8:
                  _context6.prev = 8;
                  _context6.t0 = _context6['catch'](0);
                  return _context6.abrupt('return', reject(_context6.t0));

                case 11:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, _this7, [[0, 8]]);
        }));

        return function (_x15, _x16) {
          return _ref6.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // delete config sequence
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'deleteConfigSequence',
    value: function deleteConfigSequence(modelId, sequenceId) {
      var _this8 = this;

      return new Promise(function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve, reject) {
          var dbSvc, collection, states;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this8._config.dbName);
                  _context7.next = 4;
                  return dbSvc.getCollection(_this8._config.collection);

                case 4:
                  collection = _context7.sent;
                  _context7.next = 7;
                  return _this8.getConfigSequenceStates(modelId, sequenceId);

                case 7:
                  states = _context7.sent;


                  collection.update({
                    '_id': new _mongodb2.default.ObjectID(modelId)
                  }, { '$pull': {
                      'sequences': { id: sequenceId },
                      'states': { $in: states }
                    }
                  }, { multi: true }, function (err) {

                    return err ? reject(err) : resolve(sequenceId);
                  });

                  _context7.next = 14;
                  break;

                case 11:
                  _context7.prev = 11;
                  _context7.t0 = _context7['catch'](0);
                  return _context7.abrupt('return', reject(_context7.t0));

                case 14:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, _this8, [[0, 11]]);
        }));

        return function (_x17, _x18) {
          return _ref7.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // get states from specific sequence
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getConfigSequenceStates',
    value: function getConfigSequenceStates(modelId, sequenceId) {
      var _this9 = this;

      return new Promise(function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(resolve, reject) {
          var dbSvc, collection;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this9._config.dbName);
                  _context8.next = 4;
                  return dbSvc.getCollection(_this9._config.collection);

                case 4:
                  collection = _context8.sent;


                  collection.aggregate([{
                    $match: {
                      '_id': new _mongodb2.default.ObjectId(modelId)
                    }
                  }, {
                    $project: {
                      states: 1,
                      sequences: 1
                    }
                  }, {
                    $unwind: '$sequences'
                  }, {
                    $match: {
                      'sequences.id': sequenceId
                    }
                  }], function (err, result) {

                    if (err) {

                      return reject(err);
                    }

                    if (!result || !result.length) {

                      return reject({ error: 'Not Found' });
                    }

                    var sequence = result[0].sequences;

                    var stateMap = {};

                    result[0].states.forEach(function (state) {

                      if (sequence.stateIds.indexOf(state.id) > -1) {

                        stateMap[state.id] = state;
                      }
                    });

                    var states = sequence.stateIds.map(function (id) {
                      return stateMap[id];
                    });

                    return resolve(states);
                  });

                  _context8.next = 11;
                  break;

                case 8:
                  _context8.prev = 8;
                  _context8.t0 = _context8['catch'](0);
                  return _context8.abrupt('return', reject(_context8.t0));

                case 11:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, _this9, [[0, 8]]);
        }));

        return function (_x19, _x20) {
          return _ref8.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // add state or array of states to specific sequence
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'addConfigSequenceStates',
    value: function addConfigSequenceStates(modelId, sequenceId, states) {
      var _this10 = this;

      return new Promise(function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(resolve, reject) {
          var dbSvc, collection, statesArray, stateIds;
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this10._config.dbName);
                  _context9.next = 4;
                  return dbSvc.getCollection(_this10._config.collection);

                case 4:
                  collection = _context9.sent;
                  statesArray = Array.isArray(states) ? states : [states];
                  stateIds = statesArray.map(function (item) {
                    return item.id;
                  });


                  collection.update({
                    '_id': new _mongodb2.default.ObjectID(modelId),
                    'sequences.id': sequenceId
                  }, {
                    $push: {
                      'sequences.$.stateIds': {
                        $each: stateIds
                      },
                      'states': {
                        $each: statesArray
                      }
                    }
                  }, function (err) {

                    return err ? reject(err) : resolve(states);
                  });

                  _context9.next = 13;
                  break;

                case 10:
                  _context9.prev = 10;
                  _context9.t0 = _context9['catch'](0);
                  return _context9.abrupt('return', reject(_context9.t0));

                case 13:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, _this10, [[0, 10]]);
        }));

        return function (_x21, _x22) {
          return _ref9.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // delete config sequence state
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'deleteConfigSequenceState',
    value: function deleteConfigSequenceState(modelId, sequenceId, stateId) {
      var _this11 = this;

      return new Promise(function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(resolve, reject) {
          var dbSvc, collection;
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this11._config.dbName);
                  _context10.next = 4;
                  return dbSvc.getCollection(_this11._config.collection);

                case 4:
                  collection = _context10.sent;


                  collection.update({
                    '_id': new _mongodb2.default.ObjectID(modelId),
                    'sequences.id': sequenceId
                  }, {
                    '$pull': {
                      'sequences.$.stateIds': stateId,
                      'states': { id: stateId }
                    }
                  }, { multi: true }, function (err) {

                    return err ? reject(err) : resolve(sequenceId);
                  });

                  _context10.next = 11;
                  break;

                case 8:
                  _context10.prev = 8;
                  _context10.t0 = _context10['catch'](0);
                  return _context10.abrupt('return', reject(_context10.t0));

                case 11:
                case 'end':
                  return _context10.stop();
              }
            }
          }, _callee10, _this11, [[0, 8]]);
        }));

        return function (_x23, _x24) {
          return _ref10.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // Get all meta properties for model (debug only)
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getModelMetaProperties',
    value: function getModelMetaProperties(modelId) {
      var _this12 = this;

      return new Promise(function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(resolve, reject) {
          var dbSvc, query, model;
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  _context11.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this12._config.dbName);
                  query = {
                    fieldQuery: {
                      _id: new _mongodb2.default.ObjectId(modelId)
                    },
                    pageQuery: {
                      metaProperties: 1
                    }
                  };
                  _context11.next = 5;
                  return dbSvc.findOne(_this12._config.collection, query);

                case 5:
                  model = _context11.sent;
                  return _context11.abrupt('return', resolve(model.metaProperties || []));

                case 9:
                  _context11.prev = 9;
                  _context11.t0 = _context11['catch'](0);
                  return _context11.abrupt('return', reject(_context11.t0));

                case 12:
                case 'end':
                  return _context11.stop();
              }
            }
          }, _callee11, _this12, [[0, 9]]);
        }));

        return function (_x25, _x26) {
          return _ref11.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // Get meta properties for specific dbId
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getNodeMetaProperties',
    value: function getNodeMetaProperties(modelId, dbId) {
      var _this13 = this;

      return new Promise(function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(resolve, reject) {
          var dbSvc, collection;
          return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  _context12.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this13._config.dbName);
                  _context12.next = 4;
                  return dbSvc.getCollection(_this13._config.collection);

                case 4:
                  collection = _context12.sent;


                  collection.aggregate([{
                    $match: {
                      '_id': new _mongodb2.default.ObjectId(modelId)
                    }
                  }, {
                    $project: {
                      metaProperties: 1
                    }
                  }, {
                    "$unwind": "$metaProperties"
                  }, {
                    $match: {
                      'metaProperties.dbId': dbId
                    }
                  }], function (err, result) {

                    var properties = result ? result.map(function (e) {
                      return e.metaProperties;
                    }) : [];

                    return err ? reject(err) : resolve(properties);
                  });

                  _context12.next = 11;
                  break;

                case 8:
                  _context12.prev = 8;
                  _context12.t0 = _context12['catch'](0);
                  return _context12.abrupt('return', reject(_context12.t0));

                case 11:
                case 'end':
                  return _context12.stop();
              }
            }
          }, _callee12, _this13, [[0, 8]]);
        }));

        return function (_x27, _x28) {
          return _ref12.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // Get single meta property
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getNodeMetaProperty',
    value: function getNodeMetaProperty(modelId, metaId) {
      var _this14 = this;

      return new Promise(function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(resolve, reject) {
          var dbSvc, collection;
          return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  _context13.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this14._config.dbName);
                  _context13.next = 4;
                  return dbSvc.getCollection(_this14._config.collection);

                case 4:
                  collection = _context13.sent;


                  collection.aggregate([{
                    $match: {
                      '_id': new _mongodb2.default.ObjectId(modelId)
                    }
                  }, {
                    $project: {
                      metaProperties: 1
                    }
                  }, {
                    "$unwind": "$metaProperties"
                  }, {
                    $match: {
                      'metaProperties.id': metaId
                    }
                  }], function (err, result) {

                    var properties = result ? result.map(function (e) {
                      return e.metaProperties;
                    }) : [];

                    if (err) {

                      return reject(err);
                    }

                    if (!properties.length) {

                      return reject({
                        statusCode: 404,
                        msg: 'Not Found'
                      });
                    }

                    resolve(properties[0]);
                  });

                  _context13.next = 11;
                  break;

                case 8:
                  _context13.prev = 8;
                  _context13.t0 = _context13['catch'](0);
                  return _context13.abrupt('return', reject(_context13.t0));

                case 11:
                case 'end':
                  return _context13.stop();
              }
            }
          }, _callee13, _this14, [[0, 8]]);
        }));

        return function (_x29, _x30) {
          return _ref13.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // add meta property
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'addNodeMetaProperty',
    value: function addNodeMetaProperty(modelId, metaProperty) {
      var _this15 = this;

      return new Promise(function () {
        var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(resolve, reject) {
          var dbSvc, collection;
          return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  _context14.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this15._config.dbName);
                  _context14.next = 4;
                  return dbSvc.getCollection(_this15._config.collection);

                case 4:
                  collection = _context14.sent;


                  collection.update({
                    '_id': new _mongodb2.default.ObjectID(modelId)
                  }, {
                    $push: {
                      'metaProperties': metaProperty
                    }
                  }, function (err) {

                    return err ? reject(err) : resolve(metaProperty);
                  });

                  _context14.next = 11;
                  break;

                case 8:
                  _context14.prev = 8;
                  _context14.t0 = _context14['catch'](0);
                  return _context14.abrupt('return', reject(_context14.t0));

                case 11:
                case 'end':
                  return _context14.stop();
              }
            }
          }, _callee14, _this15, [[0, 8]]);
        }));

        return function (_x31, _x32) {
          return _ref14.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // update existing config sequence
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'updateNodeMetaProperty',
    value: function updateNodeMetaProperty(modelId, metaProperty) {
      var _this16 = this;

      return new Promise(function () {
        var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(resolve, reject) {
          var dbSvc, collection;
          return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  _context15.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this16._config.dbName);
                  _context15.next = 4;
                  return dbSvc.getCollection(_this16._config.collection);

                case 4:
                  collection = _context15.sent;


                  collection.update({
                    '_id': new _mongodb2.default.ObjectID(modelId),
                    'metaProperties.id': metaProperty.id
                  }, {
                    $set: {
                      'metaProperties.$': metaProperty
                    }
                  }, function (err) {

                    return err ? reject(err) : resolve(metaProperty);
                  });

                  _context15.next = 11;
                  break;

                case 8:
                  _context15.prev = 8;
                  _context15.t0 = _context15['catch'](0);
                  return _context15.abrupt('return', reject(_context15.t0));

                case 11:
                case 'end':
                  return _context15.stop();
              }
            }
          }, _callee15, _this16, [[0, 8]]);
        }));

        return function (_x33, _x34) {
          return _ref15.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // delete node meta property
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'deleteNodeMetaProperty',
    value: function deleteNodeMetaProperty(modelId, metaId) {
      var _this17 = this;

      return new Promise(function () {
        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(resolve, reject) {
          var dbSvc, collection;
          return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  _context16.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this17._config.dbName);
                  _context16.next = 4;
                  return dbSvc.getCollection(_this17._config.collection);

                case 4:
                  collection = _context16.sent;


                  collection.update({
                    '_id': new _mongodb2.default.ObjectID(modelId)
                  }, {
                    '$pull': {
                      'metaProperties': { id: metaId }
                    }
                  }, { multi: true }, function (err) {

                    return err ? reject(err) : resolve(metaId);
                  });

                  _context16.next = 11;
                  break;

                case 8:
                  _context16.prev = 8;
                  _context16.t0 = _context16['catch'](0);
                  return _context16.abrupt('return', reject(_context16.t0));

                case 11:
                case 'end':
                  return _context16.stop();
              }
            }
          }, _callee16, _this17, [[0, 8]]);
        }));

        return function (_x35, _x36) {
          return _ref16.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // search meta properties
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'searchMetaProperties',
    value: function searchMetaProperties(modelId, searchParams) {
      var _this18 = this;

      return new Promise(function () {
        var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(resolve, reject) {
          var dbSvc, collection, text;
          return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  _context17.prev = 0;
                  dbSvc = _SvcManager2.default.getService(_this18._config.dbName);
                  _context17.next = 4;
                  return dbSvc.getCollection(_this18._config.collection);

                case 4:
                  collection = _context17.sent;
                  text = searchParams.text;


                  collection.aggregate([{
                    $match: {
                      '_id': new _mongodb2.default.ObjectId(modelId)
                    }
                  }, {
                    $project: {
                      metaProperties: 1
                    }
                  }, {
                    "$unwind": "$metaProperties"
                  }, {
                    $match: {
                      'metaProperties.displayValue': {
                        $regex: new RegExp(text)
                      }
                    }
                  }], function (err, result) {

                    var properties = result ? result.map(function (e) {
                      return e.metaProperties;
                    }) : [];

                    return err ? reject(err) : resolve(properties);
                  });

                  _context17.next = 12;
                  break;

                case 9:
                  _context17.prev = 9;
                  _context17.t0 = _context17['catch'](0);
                  return _context17.abrupt('return', reject(_context17.t0));

                case 12:
                case 'end':
                  return _context17.stop();
              }
            }
          }, _callee17, _this18, [[0, 9]]);
        }));

        return function (_x37, _x38) {
          return _ref17.apply(this, arguments);
        };
      }());
    }
  }]);

  return ModelSvc;
}(_BaseSvc3.default);

exports.default = ModelSvc;