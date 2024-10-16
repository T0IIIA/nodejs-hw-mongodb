import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  updateContact,
} from '../servises/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id: ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const newContact = await createContact(req.body);

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

  const contact = await updateContact(contactId, body);

  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

export const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  await deleteContactById(contactId);

  res.status(204).send();
};



export const putContactController = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  const { contact, isNew } = await updateContact(contactId, body, { upsert: true });

  const status = isNew ? 201 : 200;

  res.status(status).send({
    status,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};
