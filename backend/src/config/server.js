"use strict";

/**
 * Server configuration constants
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

export default {
  port: process.env.PORT || "3000",
  host: process.env.HOST || "0.0.0.0",
  concurrency: parseInt(process.env.CONCURRENCY) || 3
};
