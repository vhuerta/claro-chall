"use strict";

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _server = require("./server");

var _server2 = _interopRequireDefault(_server);

var _bootstrap = require("./server/bootstrap");

var _bootstrap2 = _interopRequireDefault(_bootstrap);

var _cluster = require("cluster");

var _cluster2 = _interopRequireDefault(_cluster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_cluster2.default.isMaster) {
  for (var i = 0; i < _config2.default.server.concurrency; i++) {
    // Create a worker
    _cluster2.default.fork();
  }
} else {
  (0, _bootstrap2.default)().then(_server2.default);
}