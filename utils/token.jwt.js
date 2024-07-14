const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, "MasterKey", {expiresIn: '1d'});
}

const verifyToken = (token) => {
    return jwt.verify(token, "MasterKey", (err, decoded) => {
        if(err){
            return err;
        }
        return decoded;
    });
}

const decodeToken = (token) => {
    return jwt.decode(token);
}   

module.exports = {
    generateToken,
    verifyToken,
    decodeToken
}

