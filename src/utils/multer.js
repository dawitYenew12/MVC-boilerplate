import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import ApiError from './ApiError.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import httpStatus from 'http-status';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = __dirname + '/../../uploads/';
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
  },
});

export default multer({
  storage,
  fileFilter: function (req, file, cb) {
    const maxFileSize = 3 * 1024 * 1024;
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new ApiError(httpStatus.BAD_REQUEST, 'Please upload an image file'),
        false,
      );
    } else if (maxFileSize < file.size) {
      cb(
        new ApiError(
          httpStatus.BAD_REQUEST,
          'File size should be less than 3MB',
        ),
        false,
      );
    } else {
      cb(null, true);
    }
  },
});
