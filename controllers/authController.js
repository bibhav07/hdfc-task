const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomErrorHandler = require("../services/customErrorHandler");
const { createJWT } = require("../services/jwt");

/**
 * 
 * @body {username, email, password} req
 * @returns json, returns 'user created' response
 */
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(
      CustomErrorHandler.badRequest(`username, email and password required!`)
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(
      CustomErrorHandler.badRequest(`user already exists with email - ${email}`)
    );
  }

  const user = new User({ username, email, password });
  await user.save();

  return res.status(StatusCodes.CREATED).json({ message: "User created" });
};


/**
 * 
 * @body {email, password} req
 * @returns json, returns jwt token on login
 */
const login = async (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      CustomErrorHandler.badRequest("email and password is required!")
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(CustomErrorHandler.notFound(`no user found`));
  }

  const isPasswordCorrect = await user.checkPassword(password);

  if (isPasswordCorrect) {

      const userToken  = await createJWT(  {   payload : {  email : user.email, username : user.username  }   }   );

    return res.status(StatusCodes.OK).json({ message: "user logged in", status : "success", token : userToken });

  } else {
    return next(CustomErrorHandler.unAuthorized("invalid email or password!"));
  }






};


module.exports = { signup, login };
