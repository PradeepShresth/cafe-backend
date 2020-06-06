const express = require('express');

const menuControllers = require('../controllers/menuControllers');

const fileUpload = require('../middleware/file-upload.js');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', menuControllers.getMenu);

router.use(checkAuth);

router.post('/', fileUpload.single('image'), menuControllers.addMenu);
router.patch('/', fileUpload.single('image'), menuControllers.updateMenu);
router.post('/delete', menuControllers.deleteMenu);

module.exports = router;