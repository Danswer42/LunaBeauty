const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const multer = require('multer');
const { submitImages } = require('../controllers/productControllers');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage, limits: { files: 1 } });

router.post('/users', userController.createUser);

router.get('/users', userController.getUsers);

router.get('/users/:id', userController.getUserById);

router.patch('/users/:id', userController.updateUser);

router.patch('/users/imgs/:id', upload.single('file'), userController.submitImages);

router.delete('/users/:id', userController.deleteUser);

module.exports = router;