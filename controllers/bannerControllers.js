
const Banner = require('../models/banner');

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
    const image = req.file.path;
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

exports.getBanner = getBanner;
exports.addBanner = addBanner;