'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseSvc2 = require('./BaseSvc');

var _BaseSvc3 = _interopRequireDefault(_BaseSvc2);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadSvc = function (_BaseSvc) {
  _inherits(UploadSvc, _BaseSvc);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function UploadSvc(config) {
    _classCallCheck(this, UploadSvc);

    // Initialize upload
    var _this = _possibleConstructorReturn(this, (UploadSvc.__proto__ || Object.getPrototypeOf(UploadSvc)).call(this, config));

    var storage = _multer2.default.diskStorage({

      destination: config.tempStorage,
      filename: function filename(req, file, cb) {
        _crypto2.default.pseudoRandomBytes(16, function (err, raw) {
          if (err) return cb(err);
          cb(null, raw.toString('hex') + _path2.default.extname(file.originalname));
        });
      }
    });

    _this.multer = (0, _multer2.default)({ storage: storage });

    // start cleanup task to remove uploaded temp files
    setInterval(function () {
      _this.clean(config.tempStorage, 60 * 60);
    }, 1000 * 60 * 60);

    setTimeout(function () {
      _this.clean(config.tempStorage);
    }, 5 * 1000);
    return _this;
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  _createClass(UploadSvc, [{
    key: 'name',
    value: function name() {

      return 'UploadSvc';
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'clean',


    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////
    value: function clean(dir) {
      var maxAge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


      console.log('Cleaning Dir: ' + dir);

      _fs2.default.readdir(dir, function (err, files) {

        if (err) {
          return console.error(err);
        }

        files.forEach(function (file) {

          var filePath = _path2.default.join(dir, file);

          _fs2.default.stat(filePath, function (err, stat) {

            if (err) {
              return console.error(err);
            }

            var now = new Date();

            var age = (now - new Date(stat.ctime)) / 1000;

            if (age > maxAge) {

              return (0, _rimraf2.default)(filePath, function (err) {

                if (err) {
                  return console.error(err);
                }
              });
            }
          });
        });
      });
    }
  }, {
    key: 'uploader',
    get: function get() {

      return this.multer;
    }
  }]);

  return UploadSvc;
}(_BaseSvc3.default);

exports.default = UploadSvc;