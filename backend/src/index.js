import config from "./config";
import start from "./server";
import bootstrap from "./server/bootstrap";

import cluster from "cluster";

if (cluster.isMaster) {
  for (var i = 0; i < config.server.concurrency; i++) {
    // Create a worker
    cluster.fork();
  }
} else {
  bootstrap().then(start);
}
