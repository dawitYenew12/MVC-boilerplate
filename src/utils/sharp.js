import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const processImage = async (input, fileName) => {
  const outPutPath = path.join(__dirname, '../../uploads/', fileName);
  sharp(input).resize(600).webp({ lossless: true }).toFile(outPutPath);
};
