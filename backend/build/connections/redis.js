"use strict";

/**
 * Connect to redis, this file export a promise to handle the connected and error event
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connection = exports.default = undefined;

var _config = require("./../config");

var _config2 = _interopRequireDefault(_config);

var _redis = require("redis");

var _redis2 = _interopRequireDefault(_redis);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bluebird2.default.promisifyAll(_redis2.default);

var client = _redis2.default.createClient({ url: _config2.default.connections.redis.url });

var connection = new _bluebird2.default(function (resolve, reject) {
  client.once("ready", resolve);
  client.once("error", reject);
});

exports.default = client;
exports.connection = connection;