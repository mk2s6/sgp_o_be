// =============================================
// ENVIRONMENT and CONFIGURATION SETTINGS
// =============================================
const config = require('config');

// Check configuration settings
if (config.get('environment') === 'default') {
  console.log('Please set the NODE_ENV to a valid values (development/production/testing/staging).');
  process.exit(1);
}

if (config.get('environment') !== 'test') {
  console.log(`Your Application environment: ${config.get('environment')}`);
  // console.log(`Your Application TimeZone: ${process.env.TZ}`);
}

// =============================================
// Load necessary MODULES for our APP
// =============================================
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const moment = require('moment');
const shortid = require('shortid');
const responseGenerator = require('./model/response-generator');
const constant = require('./model/constant');
const logger = require('./model/logger');
const auth = require('./model/auth');
const hf = require('./model/helper-function');
const error = require('./model/error');

// const passport = require('passport');

/**
 * Require for Routing
 */
const indexRouter = require('./routes/index');
const Router = require('./routes/routes');

const app = express();

// Set morgan request logging if environment is not production
if (config.get('log_incoming_request') === 'true') {
  app.use(morgan('short', { stream: logger.logStream }));
}

// TODO convert time to UTC time
// Do some initial configuration before every request
app.use((req, res, next) => {
  req.utc_start_time = moment.utc();
  req.logger_id = shortid.generate();
  // console.log(`Form middleware: ${req.utc_start_time.format()}`);
  // console.log(req.utc_start_time.getTimezoneOffset());
  next();
});

const corsOptions = {
  allowedHeaders: [
    'content-type',
    'vary',
    'age',
    'server',
    'keep-alive',
    'etag',
    'date',
    'content-length',
    'content-encoding',
    'connection',
    constant.TOKEN_NAME,
  ],
  exposedHeaders: [
    'content-type',
    'vary',
    'age',
    'server',
    'keep-alive',
    'etag',
    'date',
    'content-length',
    'content-encoding',
    'connection',
    constant.TOKEN_NAME,
  ],
};

// disable the x-powered-by headers
app.disable('x-powered-by');

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// The docs which gives REST API out backend support should not be
// available in production environment
if (config.get('environment') !== 'production') {
  app.use('/docs', express.static(path.join(__dirname, 'docs')));
}

/**
 * Session and Authentication
 */
// app.use(passport.initialize());

/**
 *  Routing
 *  Here we have all routes defined in our production application
 */

app.use('/test', indexRouter);
app.use('/', Router);

/**
 * Routes defined for testing only included in test environment
 */
if (config.get('environment') === 'test') {
  // eslint-disable-next-line global-require
  const testValidatorSanitizerRouter = require('./tests/test_helper/test-validator-sanitizer');
  app.use('/QA/validator_sanitizer', testValidatorSanitizerRouter);
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  // TODO Add environment setting for development and production and enable this
  //  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(responseGenerator.errorResponse('Not Found', err.status, 'Resource you are trying to access is not found', '', req.url));
});

module.exports = app;
