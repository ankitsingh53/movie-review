import type { Request, Response } from "express";
import {
  existingUser,
  registerUser,
  savePassword,
} from "../services/userService.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import type { AuthRequest } from "../types/authRequest.js";

export const getCurrentUser = (req: AuthRequest, res: Response) => {
  res.status(200).json({
    data: req.user,
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const stringPattern = /^[A-Za-z\s'-]+$/;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    } else if (name.length < 3) {
      return res
        .status(400)
        .json({ message: "Name Cannot be less than 3 characters" });
    } else if (!stringPattern.test(name)) {
      return res.status(400).json({ message: "Enter valid name characters" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    } else if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Enter valid email and must include '@'." });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (!password || !password.trim()) {
      return res.status(400).json({ message: "Password is required" });
    } else if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be minimum 4 characters, one letter & one digit",
      });
    }

    const getUser = await existingUser(email);
    if (getUser) {
      return res.status(409).json({
        message: "Email is already registered. Please Login !",
      });
    }

    const hashpass = await hashPassword(password);

    const user = await registerUser(name, email, hashpass);

    return res.status(201).json({
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    } else if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Enter valid email and must include '@'." });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (!password || !password.trim()) {
      return res.status(400).json({ message: "Password is required" });
    } else if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be minimum 4 characters, one letter & one digit",
      });
    }

    const user = await existingUser(email);
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Login Successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .json({ message: "Logout successfully" });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
  if (!email || !email.trim()) {
    return res.status(400).json({ message: "Email is required" });
  } else if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Enter valid email and must include '@'." });
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
  if (!password || !password.trim()) {
    return res.status(400).json({ message: "Password is required" });
  } else if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: "Password must be minimum 4 characters, one letter & one digit",
    });
  }
  try {
    const getUser = await existingUser(email);
    if (!getUser) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const hashpass = await hashPassword(password);

    const data = savePassword(getUser.email, hashpass);

    return res.status(200).json({
      message: "Password Changed Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
