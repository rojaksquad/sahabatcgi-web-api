const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Check if the 'uploads' directory exists
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            // If the directory doesn't exist, create it
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
        req.fileValidationError = 'Invalid Image File Type. Please upload a JPEG, JPG or PNG file.';
        req.file = 'invalid_file_type';
        return cb(null, false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = { storage, upload };
