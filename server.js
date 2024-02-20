require('dotenv').config()

const express = require('express');
const logger = require('morgan')
const cookieParser = require('cookie-parser');
const path = require('path');

global.app = express();
global.appDir = path.resolve(__dirname);
global.Responser = require(appDir + '/lib/responser');

// Request middleware
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', "Origin, Content-Type, Accept, Authorization, X-Requested-With, Origin");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger & token parser middleware
app.use(logger('dev'));
app.use(cookieParser());

// API routes
require(appDir+'/config/routes/index')();

// Error handler middleware
app.use(function(req, res, next) {
  res.status(404).json({
    status: 'error',
    messages: 'Not Found',
    result: ''
  })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at ${PORT}`);
});