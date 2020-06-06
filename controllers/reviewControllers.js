const fs = require('fs');

const ReviewImage = require('../models/ReviewImage');
const Review = require('../models/Review');

const getReviewImage = async (req, res, next) => {
    let reviewImage
    try {
        const reviewImages = await ReviewImage.find();
        reviewImage = reviewImages[0];
    } catch (err) {
        console.log('Error. could not find the project')
    }
    
    res.json({ reviewImage: reviewImage});
}

const addReviewImage = async (req, res, next) => {
    const image = req.file.path.replace(/\\/g, "/");
    const reviewImage = new ReviewImage({
        image: image
    })
    try {
        await reviewImage.save();
    } catch (err) {
        console.log(err);
    }
    res.status(201).json({reviewImage: reviewImage});
}

const updateReviewImage = async (req, res, next) => {
    const image = req.file.path.replace(/\\/g, "/")
    let reviewImage
    try {
        reviewImage = await ReviewImage.find();
        reviewImage = reviewImage[0];
    } catch(err) {
        console.log(err);
    }
    const imagePath = reviewImage.image;

    reviewImage.image = image;

    try {
        await reviewImage.save();
    } catch (err) {
        console.log(err);
    }
    
    fs.unlink(imagePath, err => {
        console.log(err);
    })

    res.status(200).json({ reviewImage: reviewImage});
}

const addReview = async (req, res, next) => {
    const image = req.file.path.replace(/\\/g, "/");
    const name = req.body.name;
    const comment = req.body.comment
    const review = new Review({
        name: name,
        image: image,
        comment: comment
    })
    try {
        await review.save();
    } catch (err) {
        console.log(err);
    }
    res.status(201).json({review: review});
}

const getReview = async (req, res, next) => {
    let reviews;
    try {
        reviews = await Review.find();
    } catch (err) {
        console.log('Something went wrong');
    }
    res.json({ reviews: reviews.map(review => review.toObject({getters: true})) });
}

const updateReview = async (req, res, next) => {
    const rid = req.body.rid;
    const name = req.body.name;
    let image = "";
    if (req.file) {
        image = req.file.path.replace(/\\/g, "/");
    }
    const comment = req.body.comment;
    let review
    let reviews
    try {
        review = await Review.findById(rid);
    } catch(err) {
        console.log(err);
    }

    if (name !== "") {
        review.name = name;
    }
    if (image !== "") {
        const imagePath = review.image;
        review.image = image;
        fs.unlink(imagePath, err => {
            console.log(err);
        })
    }
    if (comment !== "") {
        review.comment = comment;
    }

    try {
        await review.save();
    } catch (err) {
        console.log(err);
    }
    
    try {
        reviews = await Review.find();
    } catch(err) {
        console.log(err);
    }

    res.json({ reviews: reviews.map(review => review.toObject({getters: true})) });
}

exports.getReviewImage = getReviewImage;
exports.addReviewImage = addReviewImage;
exports.updateReviewImage = updateReviewImage;
exports.addReview = addReview;
exports.getReview = getReview;
exports.updateReview = updateReview;