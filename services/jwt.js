const jwt  = require("jsonwebtoken");


const createJWT =  async({ payload }) => {
    console.log("payload....");
    console.log(payload);
    const token  = await jwt.sign(
        payload,  
        process.env.JWT_SECRET,  
        {  expiresIn : process.env.JWT_LIFETIME }  
    )
    return token

};


const isTokenValid = ({token})  => jwt.verify(token, process.env.JWT_SECRET);

module.exports  = { createJWT, isTokenValid }