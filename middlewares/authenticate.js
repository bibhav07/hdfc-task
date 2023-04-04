const CustomErrorHandler = require("../services/customErrorHandler");
const { isTokenValid } = require("../services/jwt");

const authenticateUser = async (req, res, next) => {
    
    let token;
    // check header
    const authHeader = req.headers.authorization;
    

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }
   


    if (!token) {
      return next(CustomErrorHandler.unAuthorized('Authentication invalid'));
    }
    try {

        //verifying the jwt token
      const payload = await isTokenValid({token});
      
      // Attach the user to the req object
      req.user = {
        username: payload.email,
        role: payload.username,
      };
  
      next();
    } catch (error) {
      return next(CustomErrorHandler.unAuthorized('Authentication invalid'));
    }
  };


  module.exports= authenticateUser;