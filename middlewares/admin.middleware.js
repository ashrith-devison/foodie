
const ApiError = require('../utils/ApiError');
const adminMid = (req, res, next) => {
  if (!req.user.isAdmin) {
    return ApiError.forbidden('You are not authorized to perform this action');
  }

  return next();
};

module.exports = adminMid;