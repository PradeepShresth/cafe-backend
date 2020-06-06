const express = require('express');

const whiteLogoControllers = require('../controllers/whiteLogoControllers');

const fileUpload = require('../middleware/file-upload.js');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', whiteLogoControllers.getLogo);

router.use(checkAuth);

router.post('/', fileUpload.single('image'), whiteLogoControllers.addLogo);
router.patch('/', fileUpload.single('image'), whiteLogoControllers.updateLogo);

module.exports = router;