const express = require('express');

const footerControllers = require('../controllers/footerControllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', footerControllers.getFooter);

router.use(checkAuth);

router.post('/', footerControllers.addFooter);
router.patch('/', footerControllers.updateFooter);

module.exports = router;