import app from "./src/app.js";
import http from "http";
import dbConnect from "./src/utils/database.js";

const server = http.createServer(app);

const port = process.env.PORT || 5000;

dbConnect()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is Fire at ${port}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connect error: ", err.message);
    process.exit(1);
  });
