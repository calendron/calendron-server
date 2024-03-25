import morgan from "morgan";
import winstonLogger from "./winston";

const stream = {
  write: (message: string) => winstonLogger.http(message.trim()),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const logger = morgan(":remote-addr :method :url :status - :response-time ms", {
  stream,
  skip,
});

export default logger;
