const express = require('express');
const router = require('./src/routes');

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/docs/swagger.json');

const app = express();
const swaggerSetupOptions = {};

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(logger('dev'));
app.use(helmet());
app.use(cors());

// APIs
app.use('/api/v1', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});

module.exports = app;
