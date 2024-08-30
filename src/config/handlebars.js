import exphbs from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const configureHandlebars = async (app) => {
  app.engine('handlebars', exphbs.engine());
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname, '..', 'templates', 'emails'));
};
