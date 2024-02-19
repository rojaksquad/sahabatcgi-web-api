require('dotenv').config()

const express = require('express');
var path = require('path');

global.app = express();
global.appDir = path.resolve(__dirname);

// Request middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
require(appDir+'/config/routes/index')();

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at ${PORT}`);
});