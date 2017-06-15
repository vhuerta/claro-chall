"use strict";

/*
 * Middleare to add OUT handler to the response object
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Return the http standard message for the given status
 *
 * @param  {Number} [status=200] response status
 * @return {Object}              result object with httpCode property and message
 */
var httpCodes = function httpCodes() {
  var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;

  code = parseInt(code) || 500;

  var result = {
    status: "error",
    httpCode: code,
    message: _http2.default.STATUS_CODES[code]
  };

  if (code >= 200 && code < 400) result.status = "success";

  return result;
};

/**
 * Method than resolves the response
 *
 * @param {Object} req           http request object
 * @param {Object} res           http response object
 * @param {Number} [status=200]  response status
 * @param {Object | Array} data  response data
 */
var OUT = function OUT(req, res, _ref) {
  var _ref$code = _ref.code,
      code = _ref$code === undefined ? 200 : _ref$code,
      message = _ref.message,
      data = _ref.data;

  var logger = req.app.get("logger");

  console.log("Sending response status: " + code + ", message: " + message);

  var result = httpCodes(code);

  var response = Object.assign({}, result, {
    request: Date.now(),
    url: req.originalUrl
  });

  if (data) response = Object.assign(response, data);
  if (message) response = Object.assign(response, { message: message });

  res.statusMessage = result.message;
  res.status(result.httpCode, result.message).json(response);
};

/**
 * Add the IO method to the response object
 */

exports.default = function (req, res, next) {
  res.out = OUT.bind(OUT, req, res);

  next();
};