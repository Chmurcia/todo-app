import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma";
import { registerUserService } from "../services/userService";

const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userAlreadyExists) {
      res.status(403).json({ status: 409, message: "User already exists" });
      return;
    }

    await registerUserService(
      firstName,
      lastName,
      username,
      email,
      hashedPassword
    );

    res
      .status(201)
      .json({ status: 201, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(401).json({ status: 401, message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET!, {
      expiresIn: "7d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

export { registerUser, loginUser };
