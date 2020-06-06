const fs = require('fs');

const Menu = require('../models/Menu');

const getMenu = async (req, res, next) => {
    let menus;
    try {
        menus = await Menu.find();
    } catch (err) {
        console.log('Something went wrong');
    }
    res.json({ menus: menus.map(menu => menu.toObject({getters: true})) });
}

const addMenu = async (req, res, next) => {
    const image = req.file.path.replace(/\\/g, "/");
    const name = req.body.name;
    const type = req.body.type;
    const description = req.body.description;
    const price = req.body.price;
    const menu = new Menu({
        image: image,
        name: name,
        type: type,
        description: description,
        price: price
    })

    try {
        await menu.save();
    } catch (err) {
        console.log(err);
    }
    res.status(201).json({menu: menu});
}

const updateMenu = async (req, res, next) => {
    const mid = req.body.mid;
    // const image = req.file
    const name = req.body.name;
    let image = "";
    if (req.file) {
        image = req.file.path.replace(/\\/g, "/");
    }
    const description = req.body.description;
    const price = req.body.price;
    let menu;
    let menus;
    try {
        menu = await Menu.findById(mid);
    } catch(err) {
        console.log(err);
    }
    
    if (name !== "") {
        menu.name = name;
    }
    if (image !== "") {
        const imagePath = menu.image;
        menu.image = image;
        fs.unlink(imagePath, err => {
            console.log(err);
        })
    }
    if (description !== "") {
        menu.description = description;
    }
    if (price !== 'null') {
        menu.price = price;
    }

    console.log(image)

    try {
        await menu.save();
    } catch (err) {
        console.log(err);
    }

    try {
        menus = await Menu.find();
    } catch(err) {
        console.log(err);
    }

    res.status(200).json({ menus: menus.map(menu => menu.toObject({getters: true})) });
}

const deleteMenu = async (req, res, next) => {
    const mid = req.body.mid;
    let menu;
    let menus;
    let imagePath;
    try {
        menu = await Menu.findById(mid);
        imagePath = menu.image;
    } catch (err) {
        console.log(err);
    }

    try {
        await Menu.deleteOne({_id: mid})
    } catch (err) {
        console.log(err);
    }

    try {
        menus = await Menu.find()
    } catch (err) {
        console.log(err);
    }

    fs.unlink(imagePath, err => {
        console.log(err);
    })

    console.log('Deleted');
    res.json({ menus: menus.map(menu => menu.toObject({getters: true})) });
}

exports.getMenu = getMenu;
exports.addMenu = addMenu;
exports.updateMenu = updateMenu;
exports.deleteMenu = deleteMenu;