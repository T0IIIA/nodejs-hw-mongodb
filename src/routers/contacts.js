import { Router } from 'express';
import {
  getContactsController,
  getContactsByIdController,
  deleteContactByIdController,
  createContactController,
  editContactController,
  putContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.use('/:contactId', isValidId('contactId'));

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactsByIdController));

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(editContactController),
);

router.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

router.put('/:contactId', ctrlWrapper(putContactController));

export default router;
