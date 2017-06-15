"use strict";

/**
 * Exports a promise of all the things needed before start the server,
 * like database connections
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redis = require("../connections/redis");

exports.default = function () {
  return Promise.all([_redis.connection]);
};