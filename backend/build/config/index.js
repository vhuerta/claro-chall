"use strict";

/*
 * File for app configuration
 *
 * This file loads all the files then add it to a JSON object, if worker.js is created in this directory, the final
 * config object will be:
 *
 * {
 *  worker: {[worker.js content]}
 * }
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 *
 * Note: Config file must have a single export and it must be the "default", example:
 *  export default {foo: 'bar'}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// List files in this directory
var files = _fs2.default.readdirSync(__dirname);
// For every file found add a property to config var
var config = files.reduce(function (config, file) {
  // Prevent load this file
  if (file !== _path2.default.basename(__filename)) {
    var name = _path2.default.basename(file, _path2.default.extname(file));
    config[name] = require(_path2.default.join(__dirname, file)).default;
  }
  return config;
}, {});

exports.default = config;