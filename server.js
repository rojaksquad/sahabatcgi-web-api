require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const AdmZip = require('adm-zip');

global.app = express();
global.appDir = path.resolve(__dirname);
global.Responser = require(appDir + '/lib/responser');
global.db = require(appDir + '/models/index');

// Request middleware
app.use(function (req, res, next) {
  const allowedOrigins = ['https://stirring-pixie-ed5c9b.netlify.app', 'https://dashboard-lgk.netlify.app', 'https://elgeka-community-hub.netlify.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
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

// Serve image or static assets
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Route to list contents of /uploads directory
app.get('/uploads', (req, res) => {
  const uploadDir = path.join(__dirname, '/uploads');
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
      });
    }
    res.json({
      files: files
    });
  });
});

// Route to handle downloading files
app.get('/uploads/downloads', (req, res) => {
  const directoryPath = path.join(__dirname, 'uploads');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Create a ZIP file containing all files in the uploads directory
    const zipFilePath = path.join(__dirname, 'uploads.zip');
    const zip = new AdmZip();
    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      zip.addLocalFile(filePath);
    });
    const zipBuffer = zip.toBuffer();

    // Set headers for downloading the ZIP file
    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', 'attachment; filename=uploads.zip');
    res.set('Content-Length', zipBuffer.length);
    
    // Send the ZIP file to the client for download
    res.send(zipBuffer);
  });
});

// API routes
require(appDir+'/config/routes/index')();

// Error handler middleware
app.use(function(req, res, next) {
  res.status(404).json({
    code: 404,
    status: 'error',
    messages: 'Not Found',
    result: {}
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at ${PORT}`);
});
