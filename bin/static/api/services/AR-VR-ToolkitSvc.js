'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _BaseSvc2 = require('./BaseSvc');

var _BaseSvc3 = _interopRequireDefault(_BaseSvc2);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ARVRToolkitSvc = (_temp = _class = function (_BaseSvc) {
  _inherits(ARVRToolkitSvc, _BaseSvc);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ARVRToolkitSvc(config) {
    _classCallCheck(this, ARVRToolkitSvc);

    return _possibleConstructorReturn(this, (ARVRToolkitSvc.__proto__ || Object.getPrototypeOf(ARVRToolkitSvc)).call(this, config));
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  _createClass(ARVRToolkitSvc, [{
    key: 'name',
    value: function name() {

      return 'AR-VR-ToolkitSvc';
    }

    ///////////////////////////////////////////////////////
    // GET /arkit/v1/health
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'getHealth',
    value: function getHealth() {

      var url = ARVRToolkitSvc.BASE_URL + '/arkit/v1/health';

      return this.requestAsync({
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    // PUT /arkit/v1/{urn}/scenes/{scene_id}
    //
    // sceneDef: {
    //  prj: {
    //    bucketKey: "bucketKey",
    //    urn: "dXhgdhdghj....",
    //    objectId: 59
    //  }
    // }
    ///////////////////////////////////////////////////////

  }, {
    key: 'createScene',
    value: function createScene(token, urn, sceneId, sceneDef) {
      var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};


      var headers = {
        'x-ads-region': opts.region || 'US',
        Authorization: 'Bearer ' + token
      };

      var url = ARVRToolkitSvc.BASE_URL + '/arkit/v1/' + (urn + '/scenes/' + sceneId);

      return this.requestAsync({
        body: sceneDef,
        method: 'PUT',
        json: true,
        headers: headers,
        token: token,
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    // GET /arkit/v1/{urn}/scenes/{scene_id}
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'getScene',
    value: function getScene(token, urn, sceneId) {

      var url = ARVRToolkitSvc.BASE_URL + '/arkit/v1/' + (urn + '/scenes/' + sceneId);

      return this.requestAsync({
        json: true,
        token: token,
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    // DELETE /arkit/v1/{urn}/scenes/{scene_id}
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'deleteScene',
    value: function deleteScene(token, urn, sceneId) {

      var url = ARVRToolkitSvc.BASE_URL + '/arkit/v1/' + (urn + '/scenes/' + sceneId);

      return this.requestAsync({
        method: 'DELETE',
        json: true,
        token: token,
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    // PUT /data/v1/projects/{project_id}/versions/
    //     {version_id}/scenes/{scene_id}
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'createScene3Legged',
    value: function createScene3Legged(token, projectId, versionId, sceneId, sceneDef) {
      var opts = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};


      var headers = {
        'x-ads-region': opts.region || 'US',
        Authorization: 'Bearer ' + token
      };

      var url = ARVRToolkitSvc.BASE_URL + '/data/v1/' + ('projects/' + projectId + '/') + ('versions/' + encodeURIComponent(versionId) + '/') + ('scenes/' + sceneId);

      return this.requestAsync({
        body: sceneDef,
        method: 'PUT',
        json: true,
        headers: headers,
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    // GET /data/v1/projects/{project_id}/versions/
    //     {version_id}/scenes/{scene_id}
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'getScene3Legged',
    value: function getScene3Legged(token, projectId, versionId, sceneId) {

      var url = ARVRToolkitSvc.BASE_URL + '/data/v1/' + ('projects/' + projectId + '/') + ('versions/' + encodeURIComponent(versionId) + '/') + ('scenes/' + sceneId);

      return this.requestAsync({
        json: true,
        token: token,
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    // DELETE /data/v1/projects/{project_id}/versions/
    //        {version_id}/scenes/{scene_id}
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'deleteScene3Legged',
    value: function deleteScene3Legged(token, projectId, versionId, sceneId) {

      var url = ARVRToolkitSvc.BASE_URL + '/data/v1/' + ('projects/' + projectId + '/') + ('versions/' + encodeURIComponent(versionId) + '/') + ('scenes/' + sceneId);

      return this.requestAsync({
        method: 'DELETE',
        json: true,
        token: token,
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    // POST /modelderivative/v2/arkit/job
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'processScene',
    value: function processScene(token, urn, sceneId) {

      var url = ARVRToolkitSvc.BASE_URL + '/modelderivative/v2/arkit/job';

      var job = {
        input: {
          urn: urn
        },
        output: {
          formats: [{
            type: "arkit",
            scene: sceneId
          }]
        }
      };

      return this.requestAsync({
        method: 'POST',
        json: true,
        body: job,
        token: token,
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    // GET /modelderivative/v2/arkit/{urn}/manifest
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'getManifest',
    value: function getManifest(token, urn) {

      var url = ARVRToolkitSvc.BASE_URL + '/modelderivative/v2/arkit/' + (urn + '/manifest');

      return this.requestAsync({
        json: true,
        token: token,
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    // GET /modelderivative/v2/arkit/{urn}/scenes/{scene_id}
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'getInstanceTree',
    value: function getInstanceTree(token, urn, sceneId) {

      var url = ARVRToolkitSvc.BASE_URL + '/modelderivative/v2/arkit/' + (urn + '/scenes/' + sceneId);

      return this.requestAsync({
        json: true,
        token: token,
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    //GET /modelderivative/v2/arkit/{urn}/mesh/{dbId}/{fragId}
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'getMeshFragment',
    value: function getMeshFragment(token, urn, dbId, fragId) {

      var url = ARVRToolkitSvc.BASE_URL + '/modelderivative/v2/arkit/' + (urn + '/mesh/' + dbId + '/' + fragId);

      return this.requestAsync({
        encoding: null,
        json: true,
        token: token,
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    //GET /modelderivative/v2/arkit/{urn}/scenes/{scene_id}
    //    /mesh/{dbId}/{fragId}
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'getSceneMeshFragment',
    value: function getSceneMeshFragment(token, urn, sceneId, dbId, fragId) {
      var opts = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};


      var headers = {
        Authorization: 'Bearer ' + token,
        'x-ads-device': opts.device
      };

      var url = ARVRToolkitSvc.BASE_URL + '/modelderivative/v2/arkit/' + (urn + '/scenes/' + sceneId + '/mesh/' + dbId + '/' + fragId);

      return this.requestAsync({
        json: true,
        headers: headers,
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    //GET /modelderivative/v2/arkit/{urn}/material/{matId}/{mat}
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'getMeshFragmentMaterial',
    value: function getMeshFragmentMaterial(token, urn, matId, material) {

      var url = ARVRToolkitSvc.BASE_URL + '/modelderivative/v2/arkit/' + (urn + '/material/' + matId + '/' + material);

      return this.requestAsync({
        json: true,
        token: token,
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    //GET /modelderivative/v2/arkit/{urn}/texture/{tex}
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'getMeshFragmentTexture',
    value: function getMeshFragmentTexture(token, urn, texture) {

      var url = ARVRToolkitSvc.BASE_URL + '/modelderivative/v2/arkit/' + (urn + '/texture/' + texture);

      return this.requestAsync({
        json: true,
        token: token,
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'arrayToParam',
    value: function arrayToParam(dbIds) {

      return dbIds.reduce(function (res, dbId) {
        return res + (res.length ? ',' : '') + dbId;
      }, '');
    }

    ///////////////////////////////////////////////////////
    //GET /modelderivative/v2/arkit/{urn}/properties/{dbIds}
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'getObjectProperties',
    value: function getObjectProperties(token, urn, dbIds) {

      var dbIdsParam = Array.isArray(dbIds) ? this.arrayToParam(dbIds) : dbIds;

      var url = ARVRToolkitSvc.BASE_URL + '/modelderivative/v2/arkit/' + (urn + '/properties/' + dbIdsParam);

      return this.requestAsync({
        json: true,
        token: token,
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    //GET /modelderivative/v2/arkit/{urn}/bubble
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'getBubble',
    value: function getBubble(token, urn) {

      var url = ARVRToolkitSvc.BASE_URL + '/modelderivative/v2/arkit/' + (urn + '/bubble');

      return this.requestAsync({
        json: true,
        token: token,
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    //GET /modelderivative/v2/arkit/{urn}/unity
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'getUnityPackage',
    value: function getUnityPackage(token, urn) {

      var url = ARVRToolkitSvc.BASE_URL + '/modelderivative/v2/arkit/' + (urn + '/unity');

      return this.requestAsync({
        json: true,
        token: token,
        url: url
      });
    }

    ///////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////

  }, {
    key: 'requestAsync',
    value: function requestAsync(params) {

      return new Promise(function (resolve, reject) {

        (0, _request2.default)({

          url: params.url,
          method: params.method || 'GET',
          headers: params.headers || {
            'Authorization': 'Bearer ' + params.token
          },
          encoding: params.encoding,
          json: params.json,
          body: params.body

        }, function (err, response, body) {

          try {

            if (err) {

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

            return resolve(body);
          } catch (ex) {

            return reject(ex);
          }
        });
      });
    }
  }]);

  return ARVRToolkitSvc;
}(_BaseSvc3.default), _class.BASE_URL = "https://developer-api.autodesk.io", _temp);
exports.default = ARVRToolkitSvc;