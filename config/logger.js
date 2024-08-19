import winston from "winston";
const { format, createLogger, transports } = winston;
const { combine, timestamp, printf, colorize } = format;
import config from '../config/config.js'

const winstonFormat = printf(({ level, message, timestamp, stack}) => {
    return `${timestamp}: ${level}: ${stack || message}`;
});

export const logger = createLogger(
    {
        level: config.env === 'production' ? 'info' : 'debug',
        format: combine( timestamp(), 
            (config.env === 'production') ? winstonFormat : combine(colorize(), winstonFormat)),
        transports: [ new transports.Console() ],
    }
);
