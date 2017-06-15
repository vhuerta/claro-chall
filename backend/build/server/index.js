"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new Promise(function (resolve, reject) {
  var server = _app2.default.listen(_config2.default.server.port, function () {
    console.log("App server listen on " + _config2.default.server.host + ":" + _config2.default.server.port);
    resolve(server);
  });
  server.on("error", function (err) {
    return process.exit() && reject();
  });
});