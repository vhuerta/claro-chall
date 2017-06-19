"use strict";

/**
 * Series handler
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET_SERIES = undefined;

var _redis = require("../../connections/redis");

var _redis2 = _interopRequireDefault(_redis);

var _config = require("../../config");

var _config2 = _interopRequireDefault(_config);

var _requestPromise = require("request-promise");

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Function for get the series from the endpoint in case are not cached
 * 
 */
var getFromEndpoint = function getFromEndpoint(gId) {
  var url = _config2.default.series.endpoint.replace(":groupId", gId);
  return _requestPromise2.default.get(url, { json: true }).then(function (result) {
    return result.status !== "0" ? Promise.reject(404) : result.response;
  }).then(function (response) {
    return _redis2.default.setAsync("series:" + gId, JSON.stringify(response)), response;
  }).then(function (response) {
    return _redis2.default.expireAsync("series:" + gId, 120000), response;
  }).catch(function (err) {
    return err === 404 ? Promise.reject(404) : Promise.reject(500);
  });
};

/**
 * Handler to get the series
 */
var GET_SERIES = exports.GET_SERIES = function GET_SERIES(req, res, next) {
  var gId = req.query.gId || req.query.gid;

  if (!gId) {
    res.out({
      code: 422,
      data: { errors: { gid: "The parameter it's required" } }
    });
  }

  _redis2.default.getAsync("series:" + gId).then(function (cached) {
    return cached !== null ? JSON.parse(cached) : getFromEndpoint(gId);
  } // If not cached get from endpoint
  ).then(function (response) {
    return res.out({ code: 200, data: { response: response } });
  }).catch(function (err) {
    return res.out({ code: err || 500 });
  });
};