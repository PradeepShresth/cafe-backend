const fs = require('fs');

const Banner = require('../models/Banner');

const getBanner = async (req, res, next) => {
    let banner
    try {
        const banners = await Banner.find();
        banner = banners[0];
    } catch (err) {
        console.log('Error. could not find the project')
    }
    
    res.json({ banner: banner});
}

const addBanner = async (req, res, next) => {
    const image = req.file.path.replace(/\\/g, "/");
    const banner = new Banner({
        image: image
    })
    try {
        await banner.save();
    } catch (err) {
        console.log(err);
    }
    res.status(201).json({banner: banner});
}

const updateBanner = async (req, res, next) => {
    const image = req.file.path.replace(/\\/g, "/")
    let banner
    try {
        banner = await Banner.find();
        banner = banner[0];
    } catch(err) {
        console.log(err);
    }
    const imagePath = banner.image;

    banner.image = image;

    try {
        await banner.save();
    } catch (err) {
        console.log(err);
    }
    
    fs.unlink(imagePath, err => {
        console.log(err);
    })

    res.status(200).json({ banner: banner});
}

exports.getBanner = getBanner;
exports.addBanner = addBanner;
exports.updateBanner = updateBanner;