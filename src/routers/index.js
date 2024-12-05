import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

import contactsRouter from './contacts.js';
import authRouter from './auth.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Home Page!',
  });
});

router.use('/auth', authRouter);

router.use(authenticate);
router.use('/contacts', contactsRouter);

export default router;
