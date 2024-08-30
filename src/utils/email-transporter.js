import nodemailer from 'nodemailer';
import config from '../config/config.js';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars';
import fs from 'fs';
import { logger } from '../config/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hbs = exphbs.create();
const oauth2Client = new google.auth.OAuth2(
  config.clientId,
  config.clientSecret,
  config.redirectUri,
);

oauth2Client.setCredentials({ refresh_token: config.refreshToken });

const accessToken = await oauth2Client.getAccessToken();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: config.email,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    refreshToken: config.refreshToken,
    accessToken: accessToken.token,
  },
});

export const renderTemplate = async (templateName, context) => {
  const filePath = path.join(
    __dirname,
    '..',
    'templates',
    'emails',
    `${templateName}.handlebars`,
  );
  try {
    const templateContent = await fs.promises.readFile(filePath, 'utf8');
    const compiledTemplate = hbs.handlebars.compile(templateContent);
    const renderedHtml = compiledTemplate(context);

    return renderedHtml;
  } catch (error) {
    logger.error(`Error reading the template file: ${error.message}`);
    throw error; // or handle error as needed
  }
};

export default { transporter, renderTemplate };
