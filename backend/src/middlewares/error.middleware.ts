import type { ErrorRequestHandler } from "express";
import { AppError } from "../errors/app-error.js";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  req,
  res,
  next
): void => {
  if (res.headersSent) {
    next(error);
    return;
  }

  // Handle known application errors
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  // Log unexpected errors without exposing request data
  console.error("Unhandled application error", {
    method: req.method,
    errorType: error instanceof Error
      ? error.name
      : "UnknownError",
  });

  // Handle unexpected errors
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};