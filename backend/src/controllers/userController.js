import { insertUser,getCurrentUser } from "../models/userModel.js";
import { autheticate, generateToken } from "../utils/auth.js";
import { CustomError } from "../utils/customError.js";

export const registerUserController = async (req, res,next) => {
  const {name,email,password} = req.body;
  
  try {
    const cleaned_data = {name,email,password};
    const insertedUser = await insertUser(cleaned_data);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: insertedUser,
    });
  } catch (error) {
    next(new CustomError(error.message || "Registration failed",500));
  }
};

export const getUserController = async (req, res,next) => {
  try {
    const id = req.user.user_id;
    const user = await getCurrentUser(id);
    if (!user) {
      return next(new CustomError(`User with id ${id} doesnot exist.`,404));
    }
    return res.status(200).json({
      success:true,
      user,
    });
  } catch (error) {
    next(new CustomError(error.message || "Failed to fetch user",500));
  }
};

export const LoginUser = async (req, res,next) => {
  const { email, password } = req.body;
  try {
    const user = await autheticate(email, password);
    if (!user){
     return next(new CustomError("Email or password is incorrect",401 ));
    } 
    const token = generateToken(user);
    return res.status(200).json({
      success:true,
      message: "Login successful",
      token,
    });

  } catch (error) {
    next(new CustomError(error.message || "Login failed",500));
  }
};
