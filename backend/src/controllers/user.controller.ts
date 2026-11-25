import type { RequestHandler } from "express";

import { registerUser } from "../services/user.service.js";

import type {
  RegisterUserDto,
} from "../types/user.type.js";

export const registerUserController: RequestHandler<
  {},
  unknown,
  RegisterUserDto
> = async (req, res, next): Promise<void> => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};