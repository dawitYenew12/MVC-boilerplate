import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "./config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
morgan.token("message", (req, res) => {
  return res.locals.errorMessage || "";
});
// console.log(`:message`)
const getIPformat = () => (config.env === "production" ? "remote-addr - " : "");
const successResponseformat = `${getIPformat()} :method, :url :status :response-time ms :user-agent`;
const errorResponseformat = `${getIPformat()} :method, :url :status :response-time ms :user-agent - error-message: :message `;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "..", "logs", "access.log"),
  { flags: "a" }
);

export const morganSucessHandler = morgan(successResponseformat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode >= 400,
});

export const morganErrorHandler = morgan(errorResponseformat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400,
});
