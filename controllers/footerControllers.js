
const Footer = require('../models/Footer');

const addFooter = async (req, res, next) => {
    const about = req.body.about;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const facebook = req.body.facebook;
    const twitter = req.body.twitter;
    const instagram = req.body.instagram;
    const footer = new Footer({
        about: about,
        address: address,
        phone: phone,
        email: email,
        facebook: facebook,
        twitter: twitter,
        instagram: instagram
    })
    try {
        await footer.save();
    } catch (err) {
        console.log(err);
    }
    res.status(201).json({footer: footer});
}

const getFooter = async (req, res, next) => {
    let footer;
    try {
        const footers = await Footer.find();
        footer = footers[0];
    } catch (err) {
        console.log('Something went wrong');
    }
    res.json({ footer: footer });
}

const updateFooter = async (req, res, next) => {
    const about = req.body.about;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const facebook = req.body.facebook;
    const twitter = req.body.twitter;
    const instagram = req.body.instagram;
    let footer
    try {
        const footers = await Footer.find();
        footer = footers[0];
    } catch(err) {
        console.log(err);
    }

    if (about !== ''){
        footer.about = about;
    }
    if (address !== ''){
        footer.address = address;
    }
    if (phone !== ''){
        footer.phone = phone;
    }
    if (email !== ''){
        footer.email = email;
    }
    if (facebook !== ''){
        footer.facebook = facebook;
    }
    if (twitter !== ''){
        footer.twitter = twitter;
    }
    if (instagram !== ''){
        footer.instagram = instagram;
    }

    try {
        await footer.save();
    } catch (err) {
        console.log(err);
    }

    res.json({ footer: footer });
}

exports.addFooter = addFooter;
exports.getFooter = getFooter;
exports.updateFooter = updateFooter;