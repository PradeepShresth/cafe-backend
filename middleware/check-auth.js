const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            const error = new HttpError('Authentication Failed!!', 401);
            return next(error);
        }

        const decodedToken = jwt.decode(token, process.env.JWT_KEY);
        req.userData = {userId: decodedToken.userId};
        next();
    } catch (err) {
        const error = new HttpError('Authentication Failed!!', 401);
        return next(error);
    }
    
    
}