const jwt = require('jsonwebtoken');

const User = require('../models/User');

const HttpError = require('../models/http-error');

const signup = async (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    const user = new User({
        name: name,
        password: password
    })
    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }

    let token;
    try {
        token = jwt.sign(
            {userId: user.id}, 
            process.env.JWT_KEY,
            {expiresIn: '1h'}
        )
    } catch (err) {
        console.log(err);
    }
    

    res.status(201).json({user: user.id, token: token});
}

const login = async (req, res, next) => {
    const { name, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({name: name});;
    } catch (err) {
        return next(new HttpError('Something went wrong', 401));
    }

    if (!existingUser) {
        return next(new HttpError('Name does not match, Please try again', 401));
    }

    if (existingUser.password !== password) {
        return next(new HttpError('Password does not match, Please try again', 401));
    }

    let token;
    try {
        token = jwt.sign(
            {userId: existingUser.id}, 
            process.env.JWT_KEY,
            {expiresIn: '1h'}
        )
    } catch (err) {
        console.log(err);
    }

    res.status(201).json({userId: existingUser.id, token: token});
};

exports.login = login;
exports.signup = signup;