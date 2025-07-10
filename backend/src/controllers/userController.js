import { insertUser, getAllUsers, getCurrentUser } from "../models/userModel.js";
import { autheticate, generateToken } from "../utils/auth.js";

export const registerUserController = async (req, res) => {
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
    res.status(500).json({ error: "Failed to register User" });
  }
};

export const getUserController = async (req, res) => {
  try {
    const id = req.user.user_id;
    const user = await getCurrentUser(id);
    if (user.length === 0) {
      return res
        .status(404)
        .json({ error: `user with id ${id} doesnot exits.` });
    } else {
      res.status(200).json({
        user: user,
      });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("error fetching users:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.message });
  }
};

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await autheticate(email, password);
    if (!user) {
      return res.json({ error: "Password is incorrect" });
    }
    const token = generateToken(user);
    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ error: "Login Failed", detail: error.message });
  }
};
