import { Router } from 'express';
import contactsRouter from './contacts.js';

const router = Router();


router.use('/contacts', contactsRouter);



export default router;
