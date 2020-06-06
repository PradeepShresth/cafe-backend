const express = require('express');

const galleryControllers = require('../controllers/galleryControllers');

const fileUpload = require('../middleware/file-upload.js');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', galleryControllers.getGallery);

router.use(checkAuth);

router.post('/', fileUpload.single('image'), galleryControllers.addGallery);
router.patch('/', fileUpload.single('image'), galleryControllers.updateGallery);

module.exports = router;