
const check_status = (req, res, next) => {
    if (req.user.is_active !== true) {
         return Responser.error(res, "Your admin status is not active, authorization denied!", {}, 401);
    }
    next();
};

module.exports = check_status;
