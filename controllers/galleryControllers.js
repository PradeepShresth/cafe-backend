const fs = require('fs');

const Gallery = require('../models/Gallery');

const getGallery = async (req, res, next) => {
    let galleries
    try {
        galleries = await Gallery.find();
    } catch (err) {
        console.log('Something went wrong');
    }
    res.json({ galleries: galleries.map(gallery => gallery.toObject({getters: true})) });
}

const addGallery = async (req, res, next) => {
    const image = req.file.path.replace(/\\/g, "/");
    const gallery = new Gallery({
        image: image
    })
    try {
        await gallery.save();
    } catch (err) {
        console.log(err);
    }
    res.status(201).json({gallery: gallery});
}

const updateGallery = async (req, res, next) => {
    const image = req.file.path.replace(/\\/g, "/")
    const gid = req.body.gid;
    let gallery;
    let galleries;
    try {
        gallery = await Gallery.findById(gid);
    } catch(err) {
        console.log(err);
    }
    const imagePath = gallery.image;
    
    gallery.image = image;
    // banner.image = image;

    try {
        await gallery.save();
    } catch (err) {
        console.log(err);
    }
    
    fs.unlink(imagePath, err => {
        console.log(err);
    })

    try {
        galleries = await Gallery.find();
    } catch(err) {
        console.log(err);
    }

    res.status(200).json({ galleries: galleries.map(gallery => gallery.toObject({getters: true})) });
}

exports.getGallery = getGallery;
exports.addGallery = addGallery;
exports.updateGallery = updateGallery;