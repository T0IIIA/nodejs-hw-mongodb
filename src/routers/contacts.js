import { Router } from 'express';
import * as contactsControllers from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

import { isValidId } from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.use('/:contactId', isValidId('contactId'));

contactsRouter.get('/', ctrlWrapper(contactsControllers.getContactsController));

contactsRouter.get(
  '/:contactId',
  ctrlWrapper(contactsControllers.getContactsByIdController),
);

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(contactsControllers.createContactController),
);

contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(contactsControllers.editContactController),
);

contactsRouter.delete(
  '/:contactId',
  ctrlWrapper(contactsControllers.deleteContactByIdController),
);

contactsRouter.put(
  '/:contactId',
  ctrlWrapper(contactsControllers.putContactController),
);

export default contactsRouter;
