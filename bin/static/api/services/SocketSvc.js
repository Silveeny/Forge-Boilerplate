'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _BaseSvc2 = require('./BaseSvc');

var _BaseSvc3 = _interopRequireDefault(_BaseSvc2);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var SocketSvc = (_class = function (_BaseSvc) {
  _inherits(SocketSvc, _BaseSvc);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function SocketSvc(config) {
    _classCallCheck(this, SocketSvc);

    var _this = _possibleConstructorReturn(this, (SocketSvc.__proto__ || Object.getPrototypeOf(SocketSvc)).call(this, config));

    _this.io = (0, _socket2.default)(config.server);

    _this.connections = {};

    _this.io.sockets.on('connection', _this.handleConnection);
    return _this;
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  _createClass(SocketSvc, [{
    key: 'name',
    value: function name() {

      return 'SocketSvc';
    }

    /////////////////////////////////////////////////////////
    // Socket Connection handler
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'handleConnection',
    value: function handleConnection(socket) {
      var _this2 = this;

      this.connections[socket.id] = socket;

      socket.on('disconnect', function () {

        _this2.handleDisconnection(socket.id);
      });

      socket.on('forge.userId', function (userId) {

        socket.userId = userId;
      });

      socket.on('broadcast', function (data) {

        var socketIds = Object.keys(_this2.connections);

        var filter = socketIds.filter(function (socketId) {

          return socketId !== socket.id;
        });

        _this2.broadcast(data.msgId, data.msg, filter);
      });

      this.emit('socket.connected', {
        id: socket.id
      });

      console.log('Socket connected: ' + socket.id);
    }

    /////////////////////////////////////////////////////////
    // Socket Disconnection handler
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'handleDisconnection',
    value: function handleDisconnection(id) {

      this.emit('socket.disconnected', {
        id: id
      });

      if (this.connections[id]) {

        delete this.connections[id];

        console.log('Socket disconnected: ' + id);
      }
    }

    /////////////////////////////////////////////////////////
    // filter: array of socketIds to broadcast
    // If null, broadcast to every connected socket
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'broadcast',
    value: function broadcast(msgId, msg) {
      var _this3 = this;

      var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


      if (filter) {

        filter = Array.isArray(filter) ? filter : [filter];

        filter.forEach(function (socketId) {

          if (_this3.connections[socketId]) {

            var socket = _this3.connections[socketId];

            socket.emit(msgId, msg);
          }
        });
      } else {

        for (var socketId in this.connections) {

          var socket = this.connections[socketId];

          socket.emit(msgId, msg);
        }
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'broadcastToUser',
    value: function broadcastToUser(userId, msgId, msg) {

      Object.values(this.connections).forEach(function (socket) {

        if (socket.userId === userId) {

          socket.emit(msgId, msg);
        }
      });
    }
  }]);

  return SocketSvc;
}(_BaseSvc3.default), (_applyDecoratedDescriptor(_class.prototype, 'handleConnection', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleConnection'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleDisconnection', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleDisconnection'), _class.prototype)), _class);
exports.default = SocketSvc;