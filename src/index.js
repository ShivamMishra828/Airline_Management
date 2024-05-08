const express = require("express");
const morgan = require("morgan");
const { ServerConfig, LoggerConfig } = require("./config");

const PORT = ServerConfig.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev", { stream: LoggerConfig.accessLogStream }));

app.listen(PORT, () => {
  console.log(`Server is Up and Running on PORT:- ${PORT}`);
});
