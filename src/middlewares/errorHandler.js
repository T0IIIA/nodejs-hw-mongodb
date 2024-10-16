import isHttpError from 'http-errors';
import { MongooseError } from 'mongoose';

export const  errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    return res.status(err.status).json({
      message: err.name,
      data: err.message,
    });
  }

  if (err instanceof MongooseError) {
    return res.status(500).json({
      message: 'Mongoose error',
      data: err.message,
    });
  }

  res.status(500).json({
    message: 'Something went wrong',
    data: err.message,
  });
};
