import winston from "winston";
import { NODE_ENV } from "../config/env";

const { combine, timestamp, printf, errors, json, colorize } = winston.format;

const isDev = NODE_ENV !== "production";

const devFormat = combine(
  colorize(),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  })
);

const prodFormat = combine(
  timestamp(),
  errors({ stack: true }),
  json()
);

const transports = [];

if (isDev) {
  // ✅ Development → Console only
  transports.push(
    new winston.transports.Console({
      format: devFormat,
    })
  );
} else {
  // ✅ Production → File only
  transports.push(
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: prodFormat,
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      format: prodFormat,
    })
  );
}

const logger = winston.createLogger({
  level: isDev ? "debug" : "info",
  transports,
  exitOnError: false,
});

export default logger;