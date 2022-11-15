'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SvcManager = require('./SvcManager');

var _SvcManager2 = _interopRequireDefault(_SvcManager);

var _eachLimit = require('async/eachLimit');

var _eachLimit2 = _interopRequireDefault(_eachLimit);

var _BaseSvc2 = require('./BaseSvc');

var _BaseSvc3 = _interopRequireDefault(_BaseSvc2);

var _forgeApis = require('forge-apis');

var _forgeApis2 = _interopRequireDefault(_forgeApis);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _fs3 = require('fs');

var _fs4 = _interopRequireDefault(_fs3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OssSvc = function (_BaseSvc) {
  _inherits(OssSvc, _BaseSvc);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function OssSvc(config) {
    _classCallCheck(this, OssSvc);

    var _this = _possibleConstructorReturn(this, (OssSvc.__proto__ || Object.getPrototypeOf(OssSvc)).call(this, config));

    _this._bucketsAPI = new _forgeApis2.default.BucketsApi();
    _this._objectsAPI = new _forgeApis2.default.ObjectsApi();
    return _this;
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  _createClass(OssSvc, [{
    key: 'name',
    value: function name() {

      return 'OssSvc';
    }

    /////////////////////////////////////////////////////////
    // Returns bucket list
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getBuckets',
    value: function getBuckets(token) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      var options = {
        startAt: opts.startAt || null,
        region: opts.region || 'US',
        limit: opts.limit || 100
      };

      return this._bucketsAPI.getBuckets(options, { autoRefresh: false }, token);
    }

    /////////////////////////////////////////////////////////
    // Returns bucket details
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getBucketDetails',
    value: function getBucketDetails(token, bucketKey) {

      return this._bucketsAPI.getBucketDetails(bucketKey, { autoRefresh: false }, token);
    }

    /////////////////////////////////////////////////////////
    // Returns object list in specific bucket
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getObjects',
    value: function getObjects(token, bucketKey) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


      var options = {
        startAt: opts.startAt || null,
        region: opts.region || 'US',
        limit: opts.limit || 100
      };

      return this._objectsAPI.getObjects(bucketKey, options, { autoRefresh: false }, token);
    }

    /////////////////////////////////////////////////////////
    // Returns object details
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getObjectDetails',
    value: function getObjectDetails(token, bucketKey, objectKey) {
      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


      return this._objectsAPI.getObjectDetails(bucketKey, objectKey, opts, { autoRefresh: false }, token);
    }

    /////////////////////////////////////////////////////////
    // parse objectId into { bucketKey, objectKey }
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'parseObjectId',
    value: function parseObjectId(objectId) {

      var parts = objectId.split('/');

      var bucketKey = parts[0].split(':').pop();

      var objectKey = parts[1];

      return {
        bucketKey: bucketKey,
        objectKey: objectKey
      };
    }

    /////////////////////////////////////////////////////////
    // Creates a new bucket
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'createBucket',
    value: function createBucket(token, bucketCreationData) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


      bucketCreationData.bucketKey = validateBucketKey(bucketCreationData.bucketKey);

      bucketCreationData.policyKey = validatePolicyKey(bucketCreationData.policyKey);

      var options = {
        xAdsRegion: opts.xAdsRegion || 'US'
      };

      return this._bucketsAPI.createBucket(bucketCreationData, options, { autoRefresh: false }, token);
    }

    /////////////////////////////////////////////////////////
    // Creates a new bucket if doesnt exists
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'createBucketIfNotExist',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, bucketCreationData) {
        var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var details;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.getBucketDetails(token, bucketCreationData.bucketKey);

              case 3:
                details = _context.sent;
                return _context.abrupt('return', details);

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);

                if (!(_context.t0.statusCode === 404)) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt('return', this.createBucket(token, bucketCreationData, opts));

              case 11:
                throw _context.t0;

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function createBucketIfNotExist(_x5, _x6) {
        return _ref.apply(this, arguments);
      }

      return createBucketIfNotExist;
    }()

    /////////////////////////////////////////////////////////
    // Uploads object to bucket
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'uploadObject',
    value: function uploadObject(token, bucketKey, objectKey, file) {
      var _this2 = this;

      //TODO: Not working yet - need to migrate to SDK

      //return new Promise( async(resolve, reject) => {
      //
      //  try {
      //
      //    const data = await mzfs.readFile(file.path)
      //
      //    this._APIAuth.accessToken = token
      //
      //    return this._objectsAPI.uploadObject (
      //      bucketKey, objectKey, file.size, data, {})
      //
      //  } catch (ex) {
      //
      //    console.log(ex)
      //
      //    reject(ex)
      //  }
      //})

      return new Promise(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
          var data, url, response;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _fs2.default.readFile(file.path);

                case 3:
                  data = _context2.sent;
                  url = _util2.default.format('https://developer.api.autodesk.com/oss/v2/buckets/%s/objects/%s', bucketKey, objectKey);
                  _context2.next = 7;
                  return requestAsync({
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/octet-stream',
                      'Authorization': 'Bearer ' + token.access_token
                    },
                    body: data,
                    url: url
                  });

                case 7:
                  response = _context2.sent;


                  resolve(JSON.parse(response));

                  _context2.next = 14;
                  break;

                case 11:
                  _context2.prev = 11;
                  _context2.t0 = _context2['catch'](0);
                  return _context2.abrupt('return', reject(_context2.t0));

                case 14:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2, [[0, 11]]);
        }));

        return function (_x8, _x9) {
          return _ref2.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // Uploads object to bucket using resumable endpoint
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'uploadObjectChunked',
    value: function uploadObjectChunked(getToken, bucketKey, objectKey, file) {
      var _this3 = this;

      var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};


      return new Promise(function (resolve, reject) {

        var chunkSize = opts.chunkSize || 5 * 1024 * 1024;

        var nbChunks = Math.ceil(file.size / chunkSize);

        var chunksMap = Array.from({
          length: nbChunks
        }, function (e, i) {
          return i;
        });

        // generates uniques session ID
        var sessionId = _this3.guid();

        // prepare the upload tasks
        var uploadTasks = chunksMap.map(function (chunkIdx) {

          var start = chunkIdx * chunkSize;

          var end = Math.min(file.size, (chunkIdx + 1) * chunkSize) - 1;

          var range = 'bytes ' + start + '-' + end + '/' + file.size;

          var length = end - start + 1;

          var readStream = _fs4.default.createReadStream(file.path, {
            start: start, end: end
          });

          var run = function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var token;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return getToken();

                    case 2:
                      token = _context3.sent;
                      return _context3.abrupt('return', _this3._objectsAPI.uploadChunk(bucketKey, objectKey, length, range, sessionId, readStream, {}, { autoRefresh: false }, token));

                    case 4:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _callee3, _this3);
            }));

            return function run() {
              return _ref3.apply(this, arguments);
            };
          }();

          return {
            chunkIndex: chunkIdx,
            run: run
          };
        });

        var progress = 0;

        // runs asynchronously in parallel the upload tasks
        // number of simultaneous uploads is defined by
        // opts.concurrentUploads
        (0, _eachLimit2.default)(uploadTasks, opts.concurrentUploads || 3, function (task, callback) {

          task.run().then(function (res) {

            progress += 100.0 / nbChunks;

            if (opts.onProgress) {

              opts.onProgress({
                progress: Math.round(progress * 100) / 100,
                chunkIndex: task.chunkIndex
              });
            }

            callback();
          }, function (err) {

            if (opts.onError) {

              opts.onError(err);
            }

            callback(err);
          });
        }, function (err) {

          if (!err && opts.onComplete) {

            opts.onComplete();
          }
        });

        resolve({
          fileSize: file.size,
          bucketKey: bucketKey,
          objectKey: objectKey,
          nbChunks: nbChunks
        });
      });
    }

    /////////////////////////////////////////////////////////
    // Download object from bucket
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getObject',
    value: function getObject(token, bucketKey, objectKey) {

      //TODO: need to migrate to SDK

      //this._APIAuth.accessToken = token
      //
      //return new Promise((resolve, reject) => {
      //
      //  const  wstream = fs.createWriteStream (outputFile)
      //
      //  this._objectsAPI.getObject (
      //    bucketKey,
      //    objectKey,
      //    { encoding: null },
      //
      //    (err, data, response) => {
      //
      //      //console.log(err)
      //      //console.log(data)
      //      //console.log(response)
      //
      //      if(err) {
      //
      //        return reject(err)
      //      }
      //
      //      resolve(response)
      //    }).pipe (wstream)
      //})


      return new Promise(function (resolve, reject) {

        var url = _util2.default.format('https://developer.api.autodesk.com/oss/v2/buckets/%s/objects/%s', bucketKey, objectKey);

        (0, _request2.default)({
          url: url,
          headers: {
            'Authorization': 'Bearer ' + token.access_token
          },
          agentOptions: {
            secureProtocol: 'TLSv1_2_method' // 'TLSv1.2'
          },
          encoding: null
        }, function (err, response, body) {

          return err ? reject(err) : resolve(body);
        });
      });
    }

    /////////////////////////////////////////////////////////
    // Deletes bucket
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'deleteBucket',
    value: function deleteBucket(token, bucketKey) {

      return this._bucketsAPI.deleteBucket(bucketKey, { autoRefresh: false }, token);
    }

    /////////////////////////////////////////////////////////
    // Deletes object from bucket
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'deleteObject',
    value: function deleteObject(token, bucketKey, objectKey) {

      return this._objectsAPI.deleteObject(bucketKey, objectKey, { autoRefresh: false }, token);
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'guid',
    value: function guid() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'xxxxxxxxxxxx';


      var d = new Date().getTime();

      return format.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : r & 0x7 | 0x8).toString(16);
      });
    }
  }]);

  return OssSvc;
}(_BaseSvc3.default);

/////////////////////////////////////////////////////////
// Validates bucketKey
//
/////////////////////////////////////////////////////////


exports.default = OssSvc;
function validateBucketKey(bucketKey) {

  var result = bucketKey.replace(/[&\/\\#,+()$~%. '":*?<>{}]/g, '-');

  return result.toLowerCase();
}

/////////////////////////////////////////////////////////
// Validates policyKey
//
/////////////////////////////////////////////////////////
function validatePolicyKey(policyKey) {

  policyKey = policyKey.toLowerCase();

  if (['transient', 'temporary', 'persistent'].indexOf(policyKey) < 0) {

    return 'transient';
  }

  return policyKey;
}

/////////////////////////////////////////////////////////
// REST request wrapper
//
/////////////////////////////////////////////////////////
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

          return reject(body.errors);
        }

        if (response && [200, 201, 202].indexOf(response.statusCode) < 0) {

          return reject(response.statusMessage);
        }

        return resolve(body ? body.data || body : {});
      } catch (ex) {

        console.log(params.url);
        console.log(ex);

        return reject(ex);
      }
    });
  });
}