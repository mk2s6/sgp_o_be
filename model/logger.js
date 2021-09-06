/**
 * Functions needed for logging the application. We are using winston as our logger library.
 */

const config = require('config');
const winston = require('winston');
const constant = require('./constant');

// TODO add custom format for winston

// Generate log file name
const today = new Date();
const logFileName = `./logs/${today.getDate()}-${constant.monthNames[today.getMonth()]}-${today.getFullYear()}.log`;
const winstonTransports = [
  new winston.transports.File({
    handleRejections: config.get('log_handle_rejection') === 'true', // Uncaught Promise Rejection
    handleExceptions: config.get('log_handle_exception') === 'true', // Uncaught Exception
    exitOnError: true,
    filename: logFileName,
  }),
];

if (config.get('log_to_console') === 'true') {
  winstonTransports.push(
    new winston.transports.Console({
      handleRejections: config.get('log_handle_rejection') === 'true', // Uncaught Promise Rejection
      handleExceptions: config.get('log_handle_exception') === 'true', // Uncaught Exception
      exitOnError: true,
    }),
  );
}

const winstonLogger = winston.createLogger({
  level: config.get('log_level'),
  format: winston.format.json(),
  transports: winstonTransports,
});

winstonLogger.info('Loading Logger module');

// Create stream which writes for winston logging transport (file in this case)
const logStream = {
  write: (message) => {
    winstonLogger.info(message);
  },
};

function error(message, meta) {
  winstonLogger.error(message, { meta });
}

function warn(message, meta) {
  winstonLogger.warn(message, { meta });
}

function info(message, meta) {
  winstonLogger.info(message, { meta });
}

function http(message, meta) {
  winstonLogger.http(message, { meta });
}

function verbose(message, meta) {
  winstonLogger.verbose(message, { meta });
}

function debug(message, meta) {
  winstonLogger.debug(message, { meta });
}

function silly(message, meta) {
  winstonLogger.silly(message, { meta });
}

module.exports.logStream = logStream;
module.exports.error = error;
module.exports.warn = warn;
module.exports.info = info;
module.exports.http = http;
module.exports.verbose = verbose;
module.exports.debug = debug;
module.exports.silly = silly;
