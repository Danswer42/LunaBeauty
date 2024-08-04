const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`)
  }
});

const upload   
 = multer({ storage, limits: { fileSize: 5000000 }, limits: { files: 5 } });

module.exports = upload;