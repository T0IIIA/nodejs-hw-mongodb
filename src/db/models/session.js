import { model, Schema } from 'mongoose';

const sessionSchema = new Schema({
  name: { type: String, required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  accessTokenValidUntil: { type: Date, required: true },
  refreshTokenValidUntil: { type: Date, required: true },
});

export const UsersCollection = model('users', sessionSchema);
