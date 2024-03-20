const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
         return Responser.error(res, "No token, authorization denied!", {}, 401);
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_USER);
        req.userID = decoded.sub;
        
        next();
    } catch (error) {
        return Responser.error(res, "Invalid token!", {}, 401);
    }
};

module.exports = jwtAuth;
