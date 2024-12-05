import * as contactsServises from '../serviсes/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const { _id: userId } = req.user;
  filter.userId = userId;

  const contacts = await contactsServises.getAllContacts({
    page: +page,
    perPage: +perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsServises.getContactById(contactId);

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id: ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const newContact = await contactsServises.createContact({
    ...req.body,
    userId,
  });

  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });

  return newContact;
};

export const editContactController = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;
  const { _id: userId } = req.user;

  const contact = await contactsServises.updateContact(
    contactId,
    ...body,
    userId,
  );

  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

export const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  await contactsServises.deleteContactById(contactId);

  res.status(204).send();
};

export const putContactController = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  const { contact, isNew } = await contactsServises.updateContact(
    contactId,
    body,
    {
      upsert: true,
    },
  );

  const status = isNew ? 201 : 200;

  res.status(status).send({
    status,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};
