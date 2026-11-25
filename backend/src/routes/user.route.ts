import { Router } from "express";

import { registerUserController } from "../controllers/user.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { registerUserSchema } from "../validations/user.validation.js";

const router = Router();

router.post(
  "/register",
  validateBody(registerUserSchema),
  registerUserController
);

export default router;