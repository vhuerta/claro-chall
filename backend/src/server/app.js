"use strict";

/**
 * This file creates and configures the express app
 * and export it
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

import express from "express";

import routes from "./routes";
import cors from "./middlewares/cors_middleware";
import out from "./middlewares/out_middleware";

const app = express();

// Load middlewares
app.use(cors);
app.use(out);

// Load the routes
app.use(routes);

// 404 Routes
app.use((req, res, next) => res.out({ code: 404 }));

// Load error middleware
//app.use(error);

export default app;
