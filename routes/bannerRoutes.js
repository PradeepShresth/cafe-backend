const express = require('express');

const bannerControllers = require('../controllers/bannerControllers');

const fileUpload = require('../middleware/file-upload.js');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', bannerControllers.getBanner);

router.use(checkAuth);

router.post('/', fileUpload.single('image'), bannerControllers.addBanner);
router.patch('/', fileUpload.single('image'), bannerControllers.updateBanner);

module.exports = router;