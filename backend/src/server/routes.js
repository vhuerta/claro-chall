"use strict";

/**
 * App routes
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

import { Router } from "express";

import { GET_PING } from "./handlers/ping_handler";
import { GET_SERIES } from "./handlers/series_handler";

const router = Router();

router.get("/ping", GET_PING);
router.get("/series", GET_SERIES);

export default router;
