"use strict";

/**
 * Exports a promise of all the things needed before start the server,
 * like database connections
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

import { connection as redis } from "../connections/redis";

export default () => Promise.all([redis]);
