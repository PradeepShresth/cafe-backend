const fs = require('fs');
const path = require('path')

const express = require('express');
const mongoose = require('mongoose');

// const HttpError = require('./models/http-error');

const whiteLogoRoutes = require('./routes/whiteLogoRoutes');
const blackLogoRoutes = require('./routes/blackLogoRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const menuRoutes = require('./routes/menuRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const messageRoutes = require('./routes/messageRoutes');
const footerRoutes = require('./routes/footerRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use(express.static(path.join('public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

app.use('/api/', userRoutes);
app.use('/api/whiteLogo', whiteLogoRoutes);
app.use('/api/blackLogo', blackLogoRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/footer', footerRoutes);

// app.use((req, res, next) => {
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// })

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500).json({message: error.message || 'An unknown error occured!!'})
})
console.log(process.env.DB_USER);

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-lj72p.mongodb.net/${process.env.DB_NAME}`)
    .then(() => {
        app.listen(process.env.PORT || 8080);
    })
    .catch(err => {
        console.log(err);
    })