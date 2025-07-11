import { insertUser, getAllUsers, getCurrentUser } from "../models/userModel.js";
import { autheticate, generateToken } from "../utils/auth.js";
import { CustomError } from "../utils/customError.js";

export const registerUserController = async (req, res,next) => {
  try {
    const cleaned_data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const insertedUser = await insertUser(cleaned_data);
    res.status(201).json({
      message: "User registered successfully",
      user: insertedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserController = async (req, res,next) => {
  try {
    const id = req.user.user_id;
    const user = await getCurrentUser(id);
    if (user.length === 0) {
      throw new CustomError(`user with id ${id} doesnot exits.`,404);

    } else {
      res.status(200).json({
        user: user,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllUsersController = async (req, res,next) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const LoginUser = async (req, res,next) => {
  const { email, password } = req.body;
  try {
    const user = await autheticate(email, password);
    if (!user) throw new CustomError("Password is incorrect",401 );
        
    const token = generateToken(user);
    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    next(error);
  }
};
