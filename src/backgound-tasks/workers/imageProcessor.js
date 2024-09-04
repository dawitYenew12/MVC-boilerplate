import ApiError from '../../utils/ApiError.js';
import httpStatus from 'http-status';
import { processImage } from '../../utils/sharp.js';

export default async (job) => {
  try {
    const { file, fileName } = job.data;
    const imageBuffer = Buffer.from(file.buffer.data);
    await processImage(imageBuffer, fileName);
  } catch (error) {
    throw new ApiError(
      httpStatus.UNSUPPORTED_MEDIA_TYPE,
      'Failed to process image',
    );
  }
};
