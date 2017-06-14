"use strict";

/**
 * Middleware to add cors headers to the response
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

export default (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Cache-Control"
  );
  next();
};
