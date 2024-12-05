import { Router } from 'express';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';

import * as authControllers from '../controllers/auth.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(authControllers.registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(authControllers.loginUserController),
);

authRouter.post('/refresh', ctrlWrapper(authControllers.refreshUserController));

authRouter.post('/logout', ctrlWrapper(authControllers.logoutUserController));

export default authRouter;
