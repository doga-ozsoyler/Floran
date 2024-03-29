import { RequestHandler, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const signupController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { nickname, email, password } = req?.body;

    if (!nickname || !email || !password)
      return res.status(400).json({ success: false, message: "Missing info!" });

    const isEmailExist = await User.findOne({ email: email });
    if (isEmailExist)
      return res
        .status(404)
        .json({ success: false, message: "User already exist" });

    const passwordHash = await bcrypt.hash(password, 15);

    const user = await User.create({
      nickname: nickname,
      email: email,
      password: passwordHash,
      plants: [],
      reminders: [],
      addedPlants: [],
    });

    res.status(201).json({ success: true, message: "Signup Success!", user });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const signinController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await User.findOne({ email: req?.body?.email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Email doesn't exist" });

    const passwordIsValid = bcrypt.compareSync(
      req?.body?.password,
      `${user?.password}`
    );
    if (!passwordIsValid)
      return res
        .status(400)
        .json({ success: false, message: "Password is incorrect" });

    const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "365d",
    });

    res.status(201).json({ success: true, message: "Signin Success!", token });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
