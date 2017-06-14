"use strict";

/**
 * Stores Handler, methods for ping routes
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
import redis from "../../connections/redis";
import config from "../../config";
import request from "request-promise";

/**
 * Function for get the series from the endpoint in case are not cached
 * 
 */
const getFromEndpoint = gId => {
  const url = config.series.endpoint.replace(":groupId", gId);
  return request
    .get(url, { json: true })
    .then(
      result => (result.status !== "0" ? Promise.reject(404) : result.response)
    )
    .then(
      response =>
        (redis.setAsync(`series:${gId}`, JSON.stringify(response)), response)
    )
    .then(response => (redis.expireAsync(`series:${gId}`, 120000), response))
    .catch(err => (err === 404 ? Promise.reject(404) : Promise.reject(500)));
};

/**
 * Handler to get the series
 */
export const GET_SERIES = (req, res, next) => {
  const gId = req.query.gId;

  if (!gId) {
    res.out({
      code: 422,
      data: { errors: { gid: "The parameter it's required" } }
    });
  }

  redis
    .getAsync(`series:${gId}`)
    .then(
      cached => (cached !== null ? JSON.parse(cached) : getFromEndpoint(gId)) // If not cached get from endpoint
    )
    .then(response => res.out({ code: 200, data: { response } }))
    .catch(err => res.out({ code: err || 500 }));
};
