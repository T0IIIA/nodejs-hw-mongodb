import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSetting } from './hooks.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactsSchema.post('save', handleSaveError);

contactsSchema.pre('findOneAndUpdate', setUpdateSetting);

contactsSchema.post('findOneAndUpdate', handleSaveError);

const ContactsCollection = model('contacts', contactsSchema);

export default ContactsCollection;
