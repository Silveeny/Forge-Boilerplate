'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _flattenDeep = require('lodash/flattenDeep');

var _flattenDeep2 = _interopRequireDefault(_flattenDeep);

var _BaseSvc2 = require('./BaseSvc');

var _BaseSvc3 = _interopRequireDefault(_BaseSvc2);

var _archiver = require('archiver');

var _archiver2 = _interopRequireDefault(_archiver);

var _forgeApis = require('forge-apis');

var _forgeApis2 = _interopRequireDefault(_forgeApis);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _nodeZip = require('node-zip');

var _nodeZip2 = _interopRequireDefault(_nodeZip);

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //
// Copyright (c) Autodesk, Inc. All rights reserved
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
//
// Forge Extractor
// by Philippe Leefsma (original version by Cyrille Fauvel)
//


var ExtractorSvc = function (_BaseSvc) {
  _inherits(ExtractorSvc, _BaseSvc);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ExtractorSvc(config) {
    _classCallCheck(this, ExtractorSvc);

    var _this = _possibleConstructorReturn(this, (ExtractorSvc.__proto__ || Object.getPrototypeOf(ExtractorSvc)).call(this, config));

    _this.derivativesAPI = new _forgeApis2.default.DerivativesApi();
    return _this;
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  _createClass(ExtractorSvc, [{
    key: 'name',
    value: function name() {

      return 'ExtractorSvc';
    }

    /////////////////////////////////////////////////////////
    // Create directory async
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'mkdirpAsync',
    value: function mkdirpAsync(dir) {

      return new Promise(function (resolve, reject) {
        (0, _mkdirp2.default)(dir, function (error) {
          return error ? reject(error) : resolve();
        });
      });
    }

    /////////////////////////////////////////////////////////
    // download all URN resources to target directory
    // (unzipped)
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'download',
    value: function download(getToken, urn, directory) {
      var _this2 = this;

      return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
          var token, manifest, derivatives, nestedDerivatives, derivativesList, downloadTasks, files;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _this2.mkdirpAsync(directory);

                case 2:
                  if (!(typeof getToken == 'function')) {
                    _context2.next = 8;
                    break;
                  }

                  _context2.next = 5;
                  return getToken();

                case 5:
                  _context2.t0 = _context2.sent;
                  _context2.next = 9;
                  break;

                case 8:
                  _context2.t0 = getToken;

                case 9:
                  token = _context2.t0;
                  _context2.next = 12;
                  return _this2.derivativesAPI.getManifest(urn, {}, { autoRefresh: false }, token);

                case 12:
                  manifest = _context2.sent;
                  _context2.next = 15;
                  return _this2.getDerivatives(getToken, manifest.body);

                case 15:
                  derivatives = _context2.sent;


                  // format derivative resources
                  nestedDerivatives = derivatives.map(function (item) {

                    return item.files.map(function (file) {

                      var localPath = _path2.default.resolve(directory, item.localPath);

                      return {
                        basePath: item.basePath,
                        guid: item.guid,
                        mime: item.mime,
                        fileName: file,
                        urn: item.urn,
                        localPath: localPath
                      };
                    });
                  });

                  // flatten resources

                  derivativesList = (0, _flattenDeep2.default)(nestedDerivatives);

                  // creates async download tasks for each
                  // derivative file

                  downloadTasks = derivativesList.map(function (derivative) {

                    return new Promise(function () {
                      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
                        var urn, data, filename;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                urn = _path2.default.join(derivative.basePath, derivative.fileName);
                                _context.next = 3;
                                return _this2.getDerivative(getToken, urn);

                              case 3:
                                data = _context.sent;
                                filename = _path2.default.resolve(derivative.localPath, derivative.fileName);
                                _context.next = 7;
                                return _this2.saveToDisk(data, filename);

                              case 7:

                                resolve(filename);

                              case 8:
                              case 'end':
                                return _context.stop();
                            }
                          }
                        }, _callee, _this2);
                      }));

                      return function (_x3) {
                        return _ref2.apply(this, arguments);
                      };
                    }());
                  });

                  // wait for all files to be downloaded

                  _context2.next = 21;
                  return Promise.all(downloadTasks);

                case 21:
                  files = _context2.sent;


                  resolve(files);

                case 23:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // Parse top level manifest to collect derivatives
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'parseManifest',
    value: function parseManifest(manifest) {
      var _this3 = this;

      var items = [];

      var parseNodeRec = function parseNodeRec(node) {

        var roles = ['Autodesk.CloudPlatform.DesignDescription', 'Autodesk.CloudPlatform.PropertyDatabase', 'Autodesk.CloudPlatform.IndexableContent', 'leaflet-zip', 'thumbnail', 'graphics', 'preview', 'raas', 'pdf', 'lod'];

        if (roles.includes(node.role)) {

          var item = {
            guid: node.guid,
            mime: node.mime
          };

          var pathInfo = _this3.getPathInfo(node.urn);

          items.push(Object.assign({}, item, pathInfo));
        }

        if (node.children) {

          node.children.forEach(function (child) {

            parseNodeRec(child);
          });
        }
      };

      parseNodeRec({
        children: manifest.derivatives
      });

      return items;
    }

    /////////////////////////////////////////////////////////
    // Collect derivatives for SVF
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getSVFDerivatives',
    value: function getSVFDerivatives(getToken, item) {
      var _this4 = this;

      return new Promise(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
          var svfPath, files, data, pack, manifestData, manifest;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  svfPath = item.urn.slice(item.basePath.length);
                  files = [svfPath];
                  _context3.next = 5;
                  return _this4.getDerivative(getToken, item.urn);

                case 5:
                  data = _context3.sent;
                  pack = new _nodeZip2.default(data, {
                    checkCRC32: true,
                    base64: false
                  });
                  manifestData = pack.files['manifest.json'].asNodeBuffer();
                  manifest = JSON.parse(manifestData.toString('utf8'));


                  if (manifest.assets) {

                    manifest.assets.forEach(function (asset) {

                      // Skip SVF embedded resources
                      if (asset.URI.indexOf('embed:/') === 0) {
                        return;
                      }

                      files.push(asset.URI);
                    });
                  }

                  return _context3.abrupt('return', resolve(Object.assign({}, item, {
                    files: files
                  })));

                case 13:
                  _context3.prev = 13;
                  _context3.t0 = _context3['catch'](0);


                  reject(_context3.t0);

                case 16:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this4, [[0, 13]]);
        }));

        return function (_x4, _x5) {
          return _ref3.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // Collect derivatives for F2D
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getF2dDerivatives',
    value: function getF2dDerivatives(getToken, item) {
      var _this5 = this;

      return new Promise(function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
          var files, manifestPath, data, manifestData, manifest;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  files = ['manifest.json.gz'];
                  manifestPath = item.basePath + 'manifest.json.gz';
                  _context4.next = 5;
                  return _this5.getDerivative(getToken, manifestPath);

                case 5:
                  data = _context4.sent;
                  manifestData = _zlib2.default.gunzipSync(data);
                  manifest = JSON.parse(manifestData.toString('utf8'));


                  if (manifest.assets) {

                    manifest.assets.forEach(function (asset) {

                      // Skip SVF embedded resources
                      if (asset.URI.indexOf('embed:/') === 0) {
                        return;
                      }

                      files.push(asset.URI);
                    });
                  }

                  return _context4.abrupt('return', resolve(Object.assign({}, item, {
                    files: files
                  })));

                case 12:
                  _context4.prev = 12;
                  _context4.t0 = _context4['catch'](0);


                  reject(_context4.t0);

                case 15:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this5, [[0, 12]]);
        }));

        return function (_x6, _x7) {
          return _ref4.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // Get all derivatives from top level manifest
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getDerivatives',
    value: function getDerivatives(getToken, manifest) {
      var _this6 = this;

      return new Promise(function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
          var items, derivativeTasks, derivatives;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  items = _this6.parseManifest(manifest);
                  derivativeTasks = items.map(function (item) {

                    switch (item.mime) {

                      case 'application/autodesk-svf':
                        return _this6.getSVFDerivatives(getToken, item);

                      case 'application/autodesk-f2d':
                        return _this6.getF2dDerivatives(getToken, item);

                      case 'application/autodesk-db':
                        return Promise.resolve(Object.assign({}, item, {
                          files: ['objects_attrs.json.gz', 'objects_vals.json.gz', 'objects_offs.json.gz', 'objects_ids.json.gz', 'objects_avs.json.gz', item.rootFileName] }));

                      default:
                        return Promise.resolve(Object.assign({}, item, {
                          files: [item.rootFileName] }));
                    }
                  });
                  _context5.next = 4;
                  return Promise.all(derivativeTasks);

                case 4:
                  derivatives = _context5.sent;
                  return _context5.abrupt('return', resolve(derivatives));

                case 6:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, _this6);
        }));

        return function (_x8, _x9) {
          return _ref5.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // Generate path information from URN
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getPathInfo',
    value: function getPathInfo(encodedURN) {

      var urn = decodeURIComponent(encodedURN);

      var rootFileName = urn.slice(urn.lastIndexOf('/') + 1);

      var basePath = urn.slice(0, urn.lastIndexOf('/') + 1);

      var localPathTmp = basePath.slice(basePath.indexOf('/') + 1);

      var localPath = localPathTmp.replace(/^output\//, '');

      return {
        rootFileName: rootFileName,
        localPath: localPath,
        basePath: basePath,
        urn: urn
      };
    }

    /////////////////////////////////////////////////////////
    // Get derivative data for specific URN
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getDerivative',
    value: function getDerivative(getToken, urn) {
      var _this7 = this;

      return new Promise(function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, reject) {
          var baseUrl, url, token;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  baseUrl = 'https://developer.api.autodesk.com/';
                  url = baseUrl + ('derivativeservice/v2/derivatives/' + urn);

                  if (!(typeof getToken == 'function')) {
                    _context6.next = 8;
                    break;
                  }

                  _context6.next = 5;
                  return getToken();

                case 5:
                  _context6.t0 = _context6.sent;
                  _context6.next = 9;
                  break;

                case 8:
                  _context6.t0 = getToken;

                case 9:
                  token = _context6.t0;


                  (0, _request2.default)({
                    url: url,
                    method: 'GET',
                    headers: {
                      'Authorization': 'Bearer ' + token.access_token,
                      'Accept-Encoding': 'gzip, deflate'
                    },
                    encoding: null
                  }, function (err, response, body) {

                    if (err) {

                      return reject(err);
                    }

                    if (body && body.errors) {

                      return reject(body.errors);
                    }

                    if ([200, 201, 202].indexOf(response.statusCode) < 0) {

                      return reject(response);
                    }

                    return resolve(body || {});
                  });

                case 11:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, _this7);
        }));

        return function (_x10, _x11) {
          return _ref6.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // Save data to disk
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'saveToDisk',
    value: function saveToDisk(data, filename) {
      var _this8 = this;

      return new Promise(function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve, reject) {
          var wstream, ext;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return _this8.mkdirpAsync(_path2.default.dirname(filename));

                case 2:
                  wstream = _fs2.default.createWriteStream(filename);
                  ext = _path2.default.extname(filename);


                  wstream.on('finish', function () {

                    resolve();
                  });

                  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && ext === '.json') {

                    wstream.write(JSON.stringify(data));
                  } else {

                    wstream.write(data);
                  }

                  wstream.end();

                case 7:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, _this8);
        }));

        return function (_x12, _x13) {
          return _ref7.apply(this, arguments);
        };
      }());
    }

    /////////////////////////////////////////////////////////
    // Create a zip
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'createZip',
    value: function createZip(rootDir, zipfile, zipRoot, files) {

      return new Promise(function (resolve, reject) {

        try {

          var output = _fs2.default.createWriteStream(zipfile);

          var archive = (0, _archiver2.default)('zip');

          output.on('close', function () {

            resolve();
          });

          archive.on('error', function (err) {

            reject(err);
          });

          archive.pipe(output);

          if (files) {

            files.forEach(function (file) {

              try {

                var rs = _fs2.default.createReadStream(file);

                archive.append(rs, {
                  name: zipRoot + '/' + file.replace(rootDir, '')
                });
              } catch (ex) {

                console.log(ex);
              }
            });
          } else {

            archive.bulk([{
              expand: false,
              src: [rootDir + '/*']
            }]);
          }

          archive.finalize();
        } catch (ex) {

          reject(ex);
        }
      });
    }
  }]);

  return ExtractorSvc;
}(_BaseSvc3.default);

exports.default = ExtractorSvc;