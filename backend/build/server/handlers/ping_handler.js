"use strict";

/**
 * Ping Handler, methods for ping routes
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var GET_PING = exports.GET_PING = function GET_PING(req, res, next) {
  return res.out({ code: 200, data: { pong: "pong" } });
};