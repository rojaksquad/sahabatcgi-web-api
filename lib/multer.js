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

const upload = multer({ storage: storage });

module.exports = { storage, upload };
