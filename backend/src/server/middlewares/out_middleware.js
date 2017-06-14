"use strict";

/*
 * Middleare to add OUT handler to the response object
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

import http from "http";

/**
 * Return the http standard message for the given status
 *
 * @param  {Number} [status=200] response status
 * @return {Object}              result object with httpCode property and message
 */
const httpCodes = (code = 200) => {
  code = parseInt(code) || 500;

  let result = {
    status: "error",
    httpCode: code,
    message: http.STATUS_CODES[code]
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
const OUT = (req, res, { code = 200, message, data }) => {
  let logger = req.app.get("logger");

  console.log(`Sending response status: ${code}, message: ${message}`);

  let result = httpCodes(code);

  let response = Object.assign({}, result, {
    request: Date.now(),
    url: req.originalUrl
  });

  if (data) response = Object.assign(response, data);
  if (message) response = Object.assign(response, { message });

  res.statusMessage = result.message;
  res.status(result.httpCode, result.message).json(response);
};

/**
 * Add the IO method to the response object
 */
export default (req, res, next) => {
  res.out = OUT.bind(OUT, req, res);

  next();
};
