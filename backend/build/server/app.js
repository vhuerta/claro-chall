"use strict";

/**
 * This file creates and configures the express app
 * and export it
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

var _cors_middleware = require("./middlewares/cors_middleware");

var _cors_middleware2 = _interopRequireDefault(_cors_middleware);

var _out_middleware = require("./middlewares/out_middleware");

var _out_middleware2 = _interopRequireDefault(_out_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// Load middlewares
app.use(_cors_middleware2.default);
app.use(_out_middleware2.default);

// Load the routes
app.use(_routes2.default);

// 404 Routes
app.use(function (req, res, next) {
  return res.out({ code: 404 });
});

// Load error middleware
//app.use(error);

exports.default = app;