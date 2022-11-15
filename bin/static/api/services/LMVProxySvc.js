'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseSvc2 = require('./BaseSvc');

var _BaseSvc3 = _interopRequireDefault(_BaseSvc2);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /////////////////////////////////////////////////////////////////
// Forge Viewer proxy
// By Philippe Leefsma, February 2017
//
/////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////
var EXTENSIONS = {
  gzip: ['.json.gz', '.bin', '.pack'],
  json: ['.json.gz', '.json']
};

var WHITE_LIST = ['x-ads-acm-check-groups', // Forge Data Management API
'x-ads-acm-namespace', // Forge Data Management API
'if-modified-since', 'accept-encoding', 'if-none-match'];

var LMVProxySvc = function (_BaseSvc) {
  _inherits(LMVProxySvc, _BaseSvc);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function LMVProxySvc(config) {
    _classCallCheck(this, LMVProxySvc);

    return _possibleConstructorReturn(this, (LMVProxySvc.__proto__ || Object.getPrototypeOf(LMVProxySvc)).call(this, config));
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  _createClass(LMVProxySvc, [{
    key: 'name',
    value: function name() {

      return 'LMVProxySvc';
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'fixContentHeaders',
    value: function fixContentHeaders(req, res) {

      // DS does not return content-encoding header or
      // gzip and other files that we know are gzipped,
      // so we add it here. The viewer does want
      // gzip files uncompressed by the browser

      var extName = _path2.default.extname(req.path);

      if (EXTENSIONS.gzip.indexOf(extName) > -1) {

        res.set('content-encoding', 'gzip');
      }

      if (EXTENSIONS.json.indexOf(extName) > -1) {

        res.set('content-type', 'application/json');
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'setCORSHeaders',
    value: function setCORSHeaders(res) {

      res.set('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept');

      res.set('access-control-allow-credentials', false);

      res.set('access-control-allow-origin', '*');
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'proxyClientHeaders',
    value: function proxyClientHeaders(clientHeaders, upstreamHeaders) {

      WHITE_LIST.forEach(function (h) {

        var hval = clientHeaders[h];

        if (hval) {
          upstreamHeaders[h] = hval;
        }
      });

      // fix for OSS issue not accepting the
      // etag surrounded with double quotes...
      var etag = upstreamHeaders['if-none-match'];

      if (etag) {

        if (etag[0] === '"' && etag[etag.length - 1] === '"') {

          upstreamHeaders['if-none-match'] = etag.substring(1, etag.length - 1);
        }
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'request',
    value: function request(access_token, req, res, url) {
      var _this2 = this;

      var authHeaders = {
        Authorization: 'Bearer ' + access_token
      };

      var options = {
        host: this._config.endpoint,
        port: 443,
        path: url,
        method: 'GET', //only proxy GET
        headers: authHeaders
      };

      this.proxyClientHeaders(req.headers, options.headers);

      var creq = _https2.default.request(options, function (cres) {

        // set encoding
        // cres.setEncoding('utf8');
        for (var h in cres.headers) {
          res.set(h, cres.headers[h]);
        }

        _this2.fixContentHeaders(req, res);

        _this2.setCORSHeaders(res);

        res.writeHead(cres.statusCode);

        cres.pipe(res);

        cres.on('error', function (e) {
          // we got an error,
          // return error 500 to client and log error
          debug.error(e.message);
          res.end();
        });
      });

      creq.end();
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'generateProxy',
    value: function generateProxy(proxyEndpoint, getToken) {
      var _this3 = this;

      var proxyGet = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
          var url, token;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  url = req.url.replace(proxyEndpoint, '');
                  _context.next = 3;
                  return getToken(req.session);

                case 3:
                  token = _context.sent;


                  _this3.request(token.access_token, req, res, url);

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this3);
        }));

        return function proxyGet(_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }();

      return proxyGet;
    }
  }]);

  return LMVProxySvc;
}(_BaseSvc3.default);

exports.default = LMVProxySvc;