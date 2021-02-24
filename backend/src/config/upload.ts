import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, callback) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      callback(null, fileName);
    }
  }),
  limits: {
    fileSize: 1 * 1024 * 1024
  },
  fileFilter: (request: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    const allowedMimes = [ 'text/csv' ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type.'));
    }
  }
}