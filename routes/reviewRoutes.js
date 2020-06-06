const express = require('express');

const reviewControllers = require('../controllers/reviewControllers');

const fileUpload = require('../middleware/file-upload.js');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', reviewControllers.getReview);
router.get('/image', reviewControllers.getReviewImage);

router.use(checkAuth);

router.post('/', fileUpload.single('image'), reviewControllers.addReview);
router.post('/image', fileUpload.single('image'), reviewControllers.addReviewImage);
router.patch('/', fileUpload.single('image'), reviewControllers.updateReview);
router.patch('/image', fileUpload.single('image'), reviewControllers.updateReviewImage);

module.exports = router;