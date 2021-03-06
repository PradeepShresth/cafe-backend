const fs = require('fs');

const LogoBlack = require('../models/logoBlack');

const getLogo = async (req, res, next) => {
    let logo
    try {
        const logos = await LogoBlack.find();
        logo = logos[0];
    } catch (err) {
        console.log('Error. could not find the project')
    }
    
    res.json({ logo: logo});
}

const addLogo = async (req, res, next) => {
    const image = req.file.path.replace(/\\/g, "/");
    const logo = new LogoBlack({
        image: image
    })
    try {
        await logo.save();
    } catch (err) {
        console.log(err);
    }
    res.status(201).json({logo: logo});
}

const updateLogo = async (req, res, next) => {
    const image = req.file.path.replace(/\\/g, "/")
    let logo
    try {
        logo = await LogoBlack.find();
        logo = logo[0];
    } catch(err) {
        console.log(err);
    }
    const imagePath = logo.image;

    logo.image = image;

    try {
        await logo.save();
    } catch (err) {
        console.log(err);
    }
    
    fs.unlink(imagePath, err => {
        console.log(err);
    })

    res.status(200).json({ logo: logo});
}

exports.getLogo = getLogo;
exports.addLogo = addLogo;
exports.updateLogo = updateLogo;