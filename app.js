const fs = require('fs');
const path = require('path')

const express = require('express');
const mongoose = require('mongoose');

// const HttpError = require('./models/http-error');

const bannerRoutes = require('./routes/bannerRoutes');

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

app.use('/api/banner', bannerRoutes);

// app.use((req, res, next) => {
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// })

mongoose
    .connect(`mongodb+srv://pradeep:testpassword@cluster0-lj72p.mongodb.net/cafe?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(process.env.PORT || 8080);
    })
    .catch(err => {
        console.log(err);
    })