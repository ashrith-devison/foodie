const router = require('express').Router();
const UserModel = require('../models/user.model');
const handler = require('../utils/asynchandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken');

router.post(
    '/login',
    handler(async (req, res) => {
      const { email,password } = req.body;
      const user = await UserModel.findOne({ email });
        if(user){
            if(password !== user.password){
                throw ApiError.badRequest('Invalid password');
            }
            const payload = {
                id: user._id,
                email: user.email,
                admin : user.isAdmin
            };

            const token = jwt.sign(payload, "Secret", {
                expiresIn: '10m'
            });
            ApiResponse.send(res, 200, 'User logged in successfully', {token : token});
        }
        else{
            throw ApiError.badRequest('User not found');
        }
    })
);

module.exports = router;