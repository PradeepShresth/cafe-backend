const express = require('express');

const bannerControllers = require('../controllers/bannerControllers');

const fileUpload = require('../middleware/file-upload.js');

const router = express.Router();

router.get('/', bannerControllers.getBanner);
router.post('/', fileUpload.single('image'), bannerControllers.addBanner);

module.exports = router;