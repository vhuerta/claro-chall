"use strict";

/**
 * Ping Handler, methods for ping routes
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

export const GET_PING = (req, res, next) => {
  return res.out({ code: 200, data: { pong: "pong" } });
};
