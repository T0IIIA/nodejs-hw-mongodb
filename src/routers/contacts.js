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

const router = Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactsByIdController));

router.post('/', ctrlWrapper(createContactController));

router.patch('/:contactId', ctrlWrapper(editContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

router.put('/:contactId', ctrlWrapper(putContactController));

export default router;
