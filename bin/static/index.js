'use strict';

require('babel-polyfill');

var _expressRateLimit = require('express-rate-limit');

var _expressRateLimit2 = _interopRequireDefault(_expressRateLimit);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressStaticGzip = require('express-static-gzip');

var _expressStaticGzip2 = _interopRequireDefault(_expressStaticGzip);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _derivatives3Legged = require('./api/endpoints/derivatives3Legged');

var _derivatives3Legged2 = _interopRequireDefault(_derivatives3Legged);

var _derivatives2Legged = require('./api/endpoints/derivatives2Legged');

var _derivatives2Legged2 = _interopRequireDefault(_derivatives2Legged);

var _arVrToolkit = require('./api/endpoints/ar-vr-toolkit');

var _arVrToolkit2 = _interopRequireDefault(_arVrToolkit);

var _materials = require('./api/endpoints/materials');

var _materials2 = _interopRequireDefault(_materials);

var _extract = require('./api/endpoints/extract');

var _extract2 = _interopRequireDefault(_extract);

var _socket = require('./api/endpoints/socket');

var _socket2 = _interopRequireDefault(_socket);

var _config = require('./api/endpoints/config');

var _config2 = _interopRequireDefault(_config);

var _models = require('./api/endpoints/models');

var _models2 = _interopRequireDefault(_models);

var _forge = require('./api/endpoints/forge');

var _forge2 = _interopRequireDefault(_forge);

var _hooks = require('./api/endpoints/hooks');

var _hooks2 = _interopRequireDefault(_hooks);

var _meta = require('./api/endpoints/meta');

var _meta2 = _interopRequireDefault(_meta);

var _user = require('./api/endpoints/user');

var _user2 = _interopRequireDefault(_user);

var _dm = require('./api/endpoints/dm');

var _dm2 = _interopRequireDefault(_dm);

var _ARVRToolkitSvc = require('./api/services/AR-VR-ToolkitSvc');

var _ARVRToolkitSvc2 = _interopRequireDefault(_ARVRToolkitSvc);

var _DerivativesSvc = require('./api/services/DerivativesSvc');

var _DerivativesSvc2 = _interopRequireDefault(_DerivativesSvc);

var _SvcManager = require('./api/services/SvcManager');

var _SvcManager2 = _interopRequireDefault(_SvcManager);

var _ExtractorSvc = require('./api/services/ExtractorSvc');

var _ExtractorSvc2 = _interopRequireDefault(_ExtractorSvc);

var _LMVProxySvc = require('./api/services/LMVProxySvc');

var _LMVProxySvc2 = _interopRequireDefault(_LMVProxySvc);

var _MongoDbSvc = require('./api/services/MongoDbSvc');

var _MongoDbSvc2 = _interopRequireDefault(_MongoDbSvc);

var _SocketSvc = require('./api/services/SocketSvc');

var _SocketSvc2 = _interopRequireDefault(_SocketSvc);

var _UploadSvc = require('./api/services/UploadSvc');

var _UploadSvc2 = _interopRequireDefault(_UploadSvc);

var _ForgeSvc = require('./api/services/ForgeSvc');

var _ForgeSvc2 = _interopRequireDefault(_ForgeSvc);

var _ModelSvc = require('./api/services/ModelSvc');

var _ModelSvc2 = _interopRequireDefault(_ModelSvc);

var _UserSvc = require('./api/services/UserSvc');

var _UserSvc2 = _interopRequireDefault(_UserSvc);

var _OssSvc = require('./api/services/OssSvc');

var _OssSvc2 = _interopRequireDefault(_OssSvc);

var _DMSvc = require('./api/services/DMSvc');

var _DMSvc2 = _interopRequireDefault(_DMSvc);

var _c0nfig = require('c0nfig');

var _c0nfig2 = _interopRequireDefault(_c0nfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/////////////////////////////////////////////////////////////////////
// App initialization
//
/////////////////////////////////////////////////////////////////////


//Services


//Server stuff
var app = (0, _express2.default)();

//Config (NODE_ENV dependant)


//Endpoints
// async support


if (process.env.NODE_ENV === 'development') {

  app.use((0, _expressSession2.default)({
    secret: 'forge-rcdb',
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 // 24h session
    },
    resave: false,
    saveUninitialized: true
  }));

  var allowCrossDomain = function allowCrossDomain(req, res, next) {

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    res.header('Access-Control-Allow-Headers', 'Content-Type');

    res.header('Access-Control-Allow-Origin', '*');

    next();
  };

  app.use(allowCrossDomain);

  app.use((0, _helmet2.default)({
    frameguard: false
  }));
} else {

  var dbConfig = _c0nfig2.default.database;

  var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);

  app.use((0, _expressSession2.default)({
    secret: 'forge-rcdb',
    cookie: {
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 // 24h session
    },
    resave: false,
    saveUninitialized: true,

    store: new MongoStore({
      url: _util2.default.format('mongodb://%s:%s@%s:%d/%s', dbConfig.user, dbConfig.pass, dbConfig.dbhost, dbConfig.port, dbConfig.dbName),
      autoRemove: 'native', // Default
      autoRemoveInterval: 10 // In minutes. Default
    })
  }));

  app.use((0, _helmet2.default)());

  var limiter = new _expressRateLimit2.default({
    windowMs: 1 * 60 * 1000, // 1 minute
    delayMs: 0, // disabled
    max: 1000
  });

  app.use('/api/', limiter);
}

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.set('trust proxy', 1);
app.use((0, _cookieParser2.default)());

///////////////////////////////////////////////////////////
// Services setup
//
///////////////////////////////////////////////////////////
var derivativesSvc = new _DerivativesSvc2.default();

var lmvProxySvc = new _LMVProxySvc2.default({
  endpoint: _c0nfig2.default.forge.oauth.baseUri.replace('https://', '')
});

var forgeSvc = new _ForgeSvc2.default(_c0nfig2.default.forge);

var uploadSvc = new _UploadSvc2.default({
  tempStorage: _path2.default.join(__dirname, '/../../TMP')
});

var arvrToolkitSvc = new _ARVRToolkitSvc2.default();
var extractorSvc = new _ExtractorSvc2.default();

var ossSvc = new _OssSvc2.default();
var dmSvc = new _DMSvc2.default();

_SvcManager2.default.registerService(arvrToolkitSvc);
_SvcManager2.default.registerService(derivativesSvc);
_SvcManager2.default.registerService(extractorSvc);
_SvcManager2.default.registerService(uploadSvc);
_SvcManager2.default.registerService(forgeSvc);
_SvcManager2.default.registerService(ossSvc);
_SvcManager2.default.registerService(dmSvc);

/////////////////////////////////////////////////////////////////////
// API Routes setup
//
/////////////////////////////////////////////////////////////////////
app.use('/api/derivatives/3legged', (0, _derivatives3Legged2.default)());
app.use('/api/derivatives/2legged', (0, _derivatives2Legged2.default)());
app.use('/api/ar-vr-toolkit', (0, _arVrToolkit2.default)());
app.use('/api/materials', (0, _materials2.default)());
app.use('/api/extract', (0, _extract2.default)());
app.use('/api/socket', (0, _socket2.default)());
app.use('/api/config', (0, _config2.default)());
app.use('/api/models', (0, _models2.default)());
app.use('/api/forge', (0, _forge2.default)());
app.use('/api/hooks', (0, _hooks2.default)());
app.use('/api/meta', (0, _meta2.default)());
app.use('/api/user', (0, _user2.default)());
app.use('/api/dm', (0, _dm2.default)());

/////////////////////////////////////////////////////////////////////
// Viewer GET Proxy
//
/////////////////////////////////////////////////////////////////////
var proxy2legged = lmvProxySvc.generateProxy('lmv-proxy-2legged', function () {
  return forgeSvc.get2LeggedToken();
});

app.get('/lmv-proxy-2legged/*', proxy2legged);

var proxy3legged = lmvProxySvc.generateProxy('lmv-proxy-3legged', function (session) {
  return forgeSvc.get3LeggedTokenMaster(session);
});

app.get('/lmv-proxy-3legged/*', proxy3legged);

/////////////////////////////////////////////////////////////////////
// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware
//
/////////////////////////////////////////////////////////////////////
app.use(require('connect-history-api-fallback')());

/////////////////////////////////////////////////////////////////////
// Static routes
//
/////////////////////////////////////////////////////////////////////
if (process.env.HOT_RELOADING) {

  // dynamically require webpack dependencies
  // to keep them in devDependencies (package.json)
  var webpackConfig = require('../../webpack/development.webpack.config');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');

  var compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: webpackConfig.stats,
    progress: true,
    hot: true
  }));

  app.use(webpackHotMiddleware(compiler));

  app.use('/resources', _express2.default.static(__dirname + '/../../resources'));

  app.get('*', _express2.default.static(_path2.default.resolve(process.cwd(), './dist')));
} else {

  if (process.env.SERVE_STATIC) {

    app.use('/resources', _express2.default.static(__dirname + '/../../resources'));
  }

  app.use((0, _expressStaticGzip2.default)(_path2.default.resolve(process.cwd(), './dist'), {
    enableBrotli: true
  }));

  app.get('*', (0, _expressStaticGzip2.default)(_path2.default.resolve(process.cwd(), './dist'), {
    enableBrotli: true
  }));
}

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
var runServer = function runServer(app) {

  try {

    process.on('exit', function () {});

    process.on('uncaughtException', function (err) {

      console.log('uncaughtException');
      console.log(err);
      console.error(err.stack);
    });

    process.on('unhandledRejection', function (reason, p) {

      console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    });

    var _dbConfig = _c0nfig2.default.database;

    var dbSvc = new _MongoDbSvc2.default(_dbConfig);

    dbSvc.connect().then(function () {

      console.log('Connected to MongoDB Database: ' + _dbConfig.dbName);

      _SvcManager2.default.registerService(dbSvc);

      for (var key in _dbConfig.models) {

        var modelCfg = Object.assign({}, _dbConfig.models[key], {
          dbName: _dbConfig.dbName,
          name: key
        });

        var modelSvc = new _ModelSvc2.default(modelCfg);

        _SvcManager2.default.registerService(modelSvc);
      }

      var userCfg = Object.assign({}, _dbConfig.users, {
        uploadLimit: _c0nfig2.default.gallery.uploadLimit,
        whiteList: _c0nfig2.default.gallery.whiteList,
        dbName: _dbConfig.dbName
      });

      var userSvc = new _UserSvc2.default(userCfg);

      _SvcManager2.default.registerService(userSvc);
    });

    var server = app.listen(process.env.PORT || 3000, function () {

      var socketSvc = new _SocketSvc2.default({
        session: _expressSession2.default,
        server: server
      });

      _SvcManager2.default.registerService(socketSvc);

      var port = server.address().port;

      console.log('Server listening on PORT: ' + port);
      console.log('ENV: ' + process.env.NODE_ENV);
    });
  } catch (ex) {

    console.log('Failed to run server... ');
    console.log(ex);
  }
};

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
runServer(app);