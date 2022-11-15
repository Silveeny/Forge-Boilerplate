'use strict';

var _SvcManager = require('../services/SvcManager');

var _SvcManager2 = _interopRequireDefault(_SvcManager);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _c0nfig = require('c0nfig');

var _c0nfig2 = _interopRequireDefault(_c0nfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Philippe Leefsma 2014 - ADN/Developer Technical Services
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
/////////////////////////////////////////////////////////////////////////////////


module.exports = function () {
  var _this = this;

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  var router = _express2.default.Router();

  var shouldCompress = function shouldCompress(req, res) {
    return true;
  };

  router.use((0, _compression2.default)({
    filter: shouldCompress
  }));

  ///////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////
  router.get('/:db', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var db, dbSvc, materialsConfig, opts, items;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              db = req.params.db;
              dbSvc = _SvcManager2.default.getService(_c0nfig2.default.database.dbName);
              materialsConfig = _c0nfig2.default.database.materials[db];

              if (materialsConfig) {
                _context.next = 8;
                break;
              }

              res.status(404);
              res.json('Invalid config');
              return _context.abrupt('return');

            case 8:
              opts = {
                sort: {
                  name: 1
                }
              };
              _context.next = 11;
              return dbSvc.getItems(materialsConfig.collection, opts);

            case 11:
              items = _context.sent;


              res.json(items);

              _context.next = 20;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context['catch'](0);


              console.log(_context.t0);

              res.status(_context.t0.statusCode || 500);
              res.json(_context.t0);

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 15]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  ///////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////
  router.get('/:db/:id', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var db, dbSvc, materialsConfig, item;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              db = req.params.db;
              dbSvc = _SvcManager2.default.getService(_c0nfig2.default.database.dbName);
              materialsConfig = _c0nfig2.default.database.materials[db];

              if (materialsConfig) {
                _context2.next = 7;
                break;
              }

              res.status(404);
              return _context2.abrupt('return', res.json('Invalid collection'));

            case 7:
              _context2.next = 9;
              return dbSvc.findOne(materialsConfig.collection, {
                fieldQuery: {
                  _id: new _mongodb2.default.ObjectId(req.params.id)
                }
              });

            case 9:
              item = _context2.sent;


              res.json(item);

              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2['catch'](0);


              res.status(_context2.t0.statusCode || 500);
              res.json(_context2.t0);

            case 17:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[0, 13]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  ///////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////
  router.post('/:db', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var db, dbSvc, materialsConfig, material, query;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              db = req.params.db;
              dbSvc = _SvcManager2.default.getService(_c0nfig2.default.database.dbName);
              materialsConfig = _c0nfig2.default.database.materials[db];

              if (materialsConfig) {
                _context3.next = 8;
                break;
              }

              res.status(404);
              res.json('Invalid config');
              return _context3.abrupt('return');

            case 8:
              material = req.body;
              query = { name: material.name };
              _context3.next = 12;
              return dbSvc.upsert(materialsConfig.collection, material, query);

            case 12:

              res.json(material);

              _context3.next = 19;
              break;

            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3['catch'](0);


              res.status(_context3.t0.statusCode || 500);
              res.json(_context3.t0);

            case 19:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this, [[0, 15]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  return router;
};