const express = require('express');
const router = express.Router();
const handler = require('../utils/asynchandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const {generateToken, decodeToken, verifyToken} = require('../utils/token.jwt');

router.put('/login', handler(async (req, res) => {
    const Users = require('../models/user.model');
    const {email, password} = req.body;
    const user = await Users.findOne({email : email});
    if(password === user.password){
        const payload = {
            userId : user._id,
            isAdmin : user.isAdmin
        };
        const token = generateToken(payload);
        ApiResponse.ok(res, token);
    }
    else{
        throw ApiError.unauthorized('Invalid Credentials');
    }
}));

router.post('/register', handler(async (req, res) => {
    const {name, email, password, phonenumber, address} = req.body;
    const Users = require('../models/user.model');
    const user = new Users({
        name,
        email,
        password,
        phonenumber,
        address
    });
    await user.save();
    ApiResponse.ok(res, user);
}));

module.exports = router;