'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _flattenDeep = require('lodash/flattenDeep');

var _flattenDeep2 = _interopRequireDefault(_flattenDeep);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

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

var DerivativeSvc = function (_BaseSvc) {
  _inherits(DerivativeSvc, _BaseSvc);

  _createClass(DerivativeSvc, null, [{
    key: 'SERVICE_BASE_URL',
    get: function get() {

      return 'https://developer.api.autodesk.com/modelderivative/v2';
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }]);

  function DerivativeSvc(config) {
    _classCallCheck(this, DerivativeSvc);

    var _this = _possibleConstructorReturn(this, (DerivativeSvc.__proto__ || Object.getPrototypeOf(DerivativeSvc)).call(this, config));

    _this._derivativesAPI = new _forgeApis2.default.DerivativesApi();
    return _this;
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  _createClass(DerivativeSvc, [{
    key: 'name',
    value: function name() {

      return 'DerivativesSvc';
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'postJob',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(getToken, payload) {
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
                return _context.abrupt('return', this._derivativesAPI.translate(payload, {
                  xAdsForce: payload.output.force
                }, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function postJob(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return postJob;
    }()

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getFormats',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(getToken) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
                return _context2.abrupt('return', this._derivativesAPI.getFormats(opts, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getFormats(_x3) {
        return _ref2.apply(this, arguments);
      }

      return getFormats;
    }()

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getMetadata',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(getToken, urn) {
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
                return _context3.abrupt('return', this._derivativesAPI.getMetadata(urn, opts, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getMetadata(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return getMetadata;
    }()

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getHierarchy',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(getToken, urn, guid) {
        var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
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
                return _context4.abrupt('return', this._derivativesAPI.getModelviewMetadata(urn, guid, opts, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getHierarchy(_x8, _x9, _x10) {
        return _ref4.apply(this, arguments);
      }

      return getHierarchy;
    }()

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getProperties',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(getToken, urn, guid) {
        var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var token, url;
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


                // objectId query not supported by SDK yet
                //return this._derivativesAPI.getModelviewProperties(
                //  urn, guid, opts, {autoRefresh:false}, token)

                url = DerivativeSvc.SERVICE_BASE_URL + '/designdata/' + (urn + '/metadata/' + guid + '/properties') + (opts.objectId ? '?objectid=' + opts.objectId : '');
                return _context5.abrupt('return', requestAsync({
                  token: token,
                  json: true,
                  url: url
                }));

              case 10:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getProperties(_x12, _x13, _x14) {
        return _ref5.apply(this, arguments);
      }

      return getProperties;
    }()

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getManifest',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(getToken, urn) {
        var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
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
                return _context6.abrupt('return', this._derivativesAPI.getManifest(urn, opts, { autoRefresh: false }, token));

              case 9:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getManifest(_x16, _x17) {
        return _ref6.apply(this, arguments);
      }

      return getManifest;
    }()

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'deleteManifest',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(getToken, urn) {
        var token, url;
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


                //return this._derivativesAPI.deleteManifest (
                //  urn, {autoRefresh:false}, token)

                url = DerivativeSvc.SERVICE_BASE_URL + '/designdata/' + (urn + '/manifest');
                return _context7.abrupt('return', requestAsync({
                  method: 'DELETE',
                  token: token,
                  json: false,
                  url: url
                }));

              case 10:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function deleteManifest(_x19, _x20) {
        return _ref7.apply(this, arguments);
      }

      return deleteManifest;
    }()

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'download',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(getToken, urn, derivativeURN) {
        var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
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
                return _context8.abrupt('return', new Promise(function (resolve, reject) {

                  var url = DerivativeSvc.SERVICE_BASE_URL + '/designdata/' + (encodeURIComponent(urn) + '/manifest/') + ('' + encodeURIComponent(derivativeURN));

                  (0, _request2.default)({
                    url: url,
                    method: 'GET',
                    headers: {
                      'Authorization': 'Bearer ' + token.access_token
                    },
                    agentOptions: {
                      secureProtocol: 'TLSv1_2_method' // 'TLSv1.2'
                    },
                    encoding: null
                  }, function (err, response, body) {

                    try {

                      if (err) {

                        return reject(err);
                      }

                      if (response && [200, 201, 202].indexOf(response.statusCode) < 0) {

                        return reject(response.statusMessage);
                      }

                      if (opts.base64) {

                        resolve(bufferToBase64(body));
                      } else {

                        resolve(body);
                      }
                    } catch (ex) {

                      console.log(ex);

                      reject(ex);
                    }
                  });
                }));

              case 9:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function download(_x21, _x22, _x23) {
        return _ref8.apply(this, arguments);
      }

      return download;
    }()

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getDefaultGuid',
    value: function getDefaultGuid(getToken, urn, role) {
      var _this2 = this;

      return new Promise(function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(resolve, reject) {
          var manifestRes, derivatives1, derivatives2;
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.prev = 0;
                  _context9.next = 3;
                  return _this2.getManifest(getToken, urn);

                case 3:
                  manifestRes = _context9.sent;
                  derivatives1 = _this2.findDerivatives(manifestRes.body, {
                    type: 'geometry', role: role || '3d'
                  });

                  if (!derivatives1.length) {
                    _context9.next = 7;
                    break;
                  }

                  return _context9.abrupt('return', resolve(derivatives1[0].guid));

                case 7:
                  derivatives2 = _this2.findDerivatives(manifestRes.body, {
                    type: 'geometry', role: role || '2d'
                  });


                  derivatives2.length ? resolve(derivatives2[0].guid) : resolve(null);

                  _context9.next = 14;
                  break;

                case 11:
                  _context9.prev = 11;
                  _context9.t0 = _context9['catch'](0);


                  reject(_context9.t0);

                case 14:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, _this2, [[0, 11]]);
        }));

        return function (_x25, _x26) {
          return _ref9.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getThumbnail',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(getToken, urn) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
          width: 100, height: 100, base64: false
        };
        var token, guid, url;
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
                _context10.t1 = options.guid;

                if (_context10.t1) {
                  _context10.next = 13;
                  break;
                }

                _context10.next = 12;
                return this.getDefaultGuid(token, urn, options.role);

              case 12:
                _context10.t1 = _context10.sent;

              case 13:
                guid = _context10.t1;
                url = DerivativeSvc.SERVICE_BASE_URL + '/designdata/' + (urn + '/thumbnail?') + ('width=' + options.width + '&') + ('height=' + options.height) + (guid ? '&guid=' + guid : '');
                return _context10.abrupt('return', new Promise(function (resolve, reject) {

                  (0, _request2.default)({
                    url: url,
                    method: 'GET',
                    headers: {
                      'Authorization': 'Bearer ' + token.access_token
                    },
                    agentOptions: {
                      secureProtocol: 'TLSv1_2_method' // 'TLSv1.2'
                    },
                    encoding: null
                  }, function (err, response, body) {

                    try {

                      if (err) {

                        return reject(err);
                      }

                      if (response && [200, 201, 202].indexOf(response.statusCode) < 0) {

                        return reject(response.statusMessage);
                      }

                      options.base64 ? resolve(bufferToBase64(body)) : resolve(body);
                    } catch (ex) {

                      reject(ex);
                    }
                  });
                }));

              case 16:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getThumbnail(_x27, _x28) {
        return _ref10.apply(this, arguments);
      }

      return getThumbnail;
    }()

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'buildDefaultJobQuery',
    value: function buildDefaultJobQuery(job) {

      switch (job.output.formats[0].type) {

        case 'svf':

          return { type: 'geometry' };

        case 'obj':
          var objectIds = job.output.formats[0].advanced.objectIds;


          if (objectIds) {

            return function (derivative) {
              return derivative.role === 'obj' && (0, _isEqual2.default)(derivative.objectIds, objectIds);
            };
          }

        default:

          return { role: job.output.formats[0].type };
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'postJobWithProgress',
    value: function postJobWithProgress(getToken, job) {
      var _this3 = this;

      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


      return new Promise(function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(resolve, reject) {
          var jobRes, onProgress, derivative;
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  _context11.prev = 0;
                  _context11.next = 3;
                  return _this3.postJob(getToken, job);

                case 3:
                  jobRes = _context11.sent;


                  if (!opts.waitResult) {

                    resolve(jobRes);
                  }

                  if (!['success', 'created'].includes(jobRes.body.result)) {
                    _context11.next = 13;
                    break;
                  }

                  onProgress = function onProgress(progress) {

                    if (opts.onProgress) {

                      opts.onProgress(progress);
                    }
                  };

                  _context11.next = 9;
                  return _this3.getDerivative(getToken, job.input.urn, opts.query || _this3.buildDefaultJobQuery(job), job.output.formats[0].type, onProgress, true);

                case 9:
                  derivative = _context11.sent;


                  if (job.output.formats[0].type === 'svf') {

                    resolve({
                      urn: job.input.urn
                    });
                  } else {

                    resolve(derivative);
                  }

                  _context11.next = 14;
                  break;

                case 13:
                  return _context11.abrupt('return', reject(job));

                case 14:
                  _context11.next = 19;
                  break;

                case 16:
                  _context11.prev = 16;
                  _context11.t0 = _context11['catch'](0);
                  return _context11.abrupt('return', reject(_context11.t0));

                case 19:
                case 'end':
                  return _context11.stop();
              }
            }
          }, _callee11, _this3, [[0, 16]]);
        }));

        return function (_x31, _x32) {
          return _ref11.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'findDerivatives',
    value: function findDerivatives(parent, query) {
      var _this4 = this;

      if (!parent) {

        return [];
      }

      var derivatives = parent.derivatives || parent.children;

      if (derivatives) {

        var matches = derivatives.filter(function (derivative) {

          derivative.parent = parent;

          if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object') {

            var match = true;

            for (var key in query) {

              if (query[key] !== derivative[key]) {

                match = false;
              }
            }

            return match;
          } else if (typeof query === 'function') {

            return query(derivative);
          }
        });

        var childResults = derivatives.map(function (derivative) {

          return _this4.findDerivatives(derivative, query);
        });

        return (0, _flattenDeep2.default)([matches, childResults]);
      }

      return [];
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'hasDerivative',
    value: function hasDerivative(manifest, query) {

      var derivatives = this.findDerivatives(manifest, query);

      return derivatives.length > 0;
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getDerivative',
    value: function getDerivative(getToken, urn, query, outputType) {
      var _this5 = this;

      var onProgress = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var skipNotFound = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;


      return new Promise(function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(resolve, reject) {
          var manifestRes, manifest, derivatives, derivative, progress, status, parentDerivatives, _progress;

          return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  _context12.prev = 0;

                case 1:
                  if (!true) {
                    _context12.next = 39;
                    break;
                  }

                  _context12.next = 4;
                  return _this5.getManifest(getToken, urn);

                case 4:
                  manifestRes = _context12.sent;
                  manifest = manifestRes.body;

                  //if(manifest.status === 'failed') {
                  //  return reject(manifest)
                  //}

                  if (manifest.derivatives) {
                    _context12.next = 8;
                    break;
                  }

                  return _context12.abrupt('return', reject(manifest));

                case 8:
                  derivatives = _this5.findDerivatives(manifest, query);

                  if (!derivatives.length) {
                    _context12.next = 23;
                    break;
                  }

                  derivative = derivatives[0];
                  progress = manifest.progress.split(' ')[0];


                  progress = progress === 'complete' ? '100%' : progress;

                  onProgress ? onProgress(progress) : '';

                  status = derivative.status || derivative.parent.status;

                  if (!(status === 'success')) {
                    _context12.next = 20;
                    break;
                  }

                  onProgress ? onProgress('100%') : '';

                  return _context12.abrupt('return', resolve(derivative));

                case 20:
                  if (!(status === 'failed')) {
                    _context12.next = 23;
                    break;
                  }

                  onProgress ? onProgress('failed') : '';

                  return _context12.abrupt('return', reject(derivative));

                case 23:

                  // if no parent -> no derivative of this type
                  // OR
                  // if parent complete and no target -> derivative not requested

                  parentDerivatives = _this5.findDerivatives(manifest, { outputType: outputType });

                  if (parentDerivatives.length) {
                    _context12.next = 30;
                    break;
                  }

                  if (manifest.status === 'inprogress') {
                    _progress = manifest.progress.split(' ')[0];


                    onProgress ? onProgress(_progress) : '';
                  }

                  if (skipNotFound) {
                    _context12.next = 28;
                    break;
                  }

                  return _context12.abrupt('return', resolve({
                    status: 'not found'
                  }));

                case 28:
                  _context12.next = 35;
                  break;

                case 30:
                  if (!(parentDerivatives[0].status === 'success')) {
                    _context12.next = 35;
                    break;
                  }

                  if (derivatives.length) {
                    _context12.next = 35;
                    break;
                  }

                  onProgress ? onProgress('0%') : '';

                  if (skipNotFound) {
                    _context12.next = 35;
                    break;
                  }

                  return _context12.abrupt('return', resolve({
                    status: 'not found'
                  }));

                case 35:
                  _context12.next = 37;
                  return sleep(1000);

                case 37:
                  _context12.next = 1;
                  break;

                case 39:
                  _context12.next = 44;
                  break;

                case 41:
                  _context12.prev = 41;
                  _context12.t0 = _context12['catch'](0);
                  return _context12.abrupt('return', reject(_context12.t0));

                case 44:
                case 'end':
                  return _context12.stop();
              }
            }
          }, _callee12, _this5, [[0, 41]]);
        }));

        return function (_x35, _x36) {
          return _ref12.apply(this, arguments);
        };
      }());
    }
  }]);

  return DerivativeSvc;
}(_BaseSvc3.default);

///////////////////////////////////////////////////////////
// Utils
//
///////////////////////////////////////////////////////////


exports.default = DerivativeSvc;
function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}

function bufferToBase64(buffer) {

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  var bytes = buffer,
      i,
      len = bytes.length,
      base64 = "";

  for (i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
    base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
    base64 += chars[bytes[i + 2] & 63];
  }

  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + "=";
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + "==";
  }

  return base64;
}

function requestAsync(params) {

  return new Promise(function (resolve, reject) {

    (0, _request2.default)({

      url: params.url,
      method: params.method || 'GET',
      headers: {
        'Authorization': 'Bearer ' + params.token.access_token
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

          return reject(body.errors);
        }

        if ([200, 201, 202].indexOf(response.statusCode) < 0) {

          return reject(response);
        }

        return resolve(body || {});
      } catch (ex) {

        console.log(params.url);
        console.log(ex);

        return reject(response);
      }
    });
  });
}