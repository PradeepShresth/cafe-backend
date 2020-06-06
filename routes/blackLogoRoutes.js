const express = require('express');

const blackLogoControllers = require('../controllers/blackLogoControllers');

const fileUpload = require('../middleware/file-upload.js');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', blackLogoControllers.getLogo);

router.use(checkAuth);

router.post('/', fileUpload.single('image'), blackLogoControllers.addLogo);
router.patch('/', fileUpload.single('image'), blackLogoControllers.updateLogo);

module.exports = router;