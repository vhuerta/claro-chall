import app from "./app";
import config from "../config";

export default new Promise((resolve, reject) => {
  const server = app.listen(config.server.port, () => {
    console.log(
      `App server listen on ${config.server.host}:${config.server.port}`
    );
    resolve(server);
  });
  server.on("error", err => process.exit() && reject());
});
