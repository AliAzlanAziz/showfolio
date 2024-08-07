import * as SibApiV3Sdk from '@sendinblue/client';
import { SendSmtpEmail } from '@sendinblue/client';
import * as fs from 'fs';
import { CONSTANTS } from '../constants/constants';
import * as dotenv from 'dotenv';
import path from 'path';
import { serviceLogger } from '../config/logger';

const logger = serviceLogger('mailer.js')

dotenv.config({ path: __dirname + './../config/config.env' })

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

export const sendPasswordResetCodeMail = async (receiver: string, code: string) => {
  try {
    const htmlMail = getPasswordResetCodeHTMLMail(receiver, code);

    const sendSmtpEmail = new SendSmtpEmail();

    sendSmtpEmail.sender = { name: 'Showfolio', email: 'aliazlan2002@gmail.com' };
    sendSmtpEmail.to = [{ email: receiver }];
    sendSmtpEmail.subject = CONSTANTS.PASSWORD_RESET_CODE_MAIL_SUBJECT;
    sendSmtpEmail.htmlContent = htmlMail;

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return true
  } catch (error) {
    logger.error(JSON.stringify(error))
    throw new Error('Error sending reset code to the email!');
  }
}

export const sendAfterPasswordResetMail = async (receiver: string) => {
  try {
    const htmlMail = getAfterPasswordResetHTMLMail(receiver);

    const sendSmtpEmail = new SendSmtpEmail();

    sendSmtpEmail.sender = { name: 'Showfolio', email: 'aliazlan2002@gmail.com' };
    sendSmtpEmail.to = [{ email: receiver }];
    sendSmtpEmail.subject = CONSTANTS.AFTER_PASSWORD_RESET_MAIL_SUBJECT;
    sendSmtpEmail.htmlContent = htmlMail;

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return true
  } catch (error) {
    logger.error(JSON.stringify(error))
    throw new Error('Error sending reset code to the email!');
  }
}

export const sendWaitingListJoinedMail = async (receiver: string) => {
  try {
    const htmlMail = getWaitingListJoinedHTMLMail(receiver);

    const sendSmtpEmail = new SendSmtpEmail();

    sendSmtpEmail.sender = { name: 'Showfolio', email: 'aliazlan2002@gmail.com' };
    sendSmtpEmail.to = [{ email: receiver }];
    sendSmtpEmail.subject = CONSTANTS.WAITING_LIST_JOINED_MAIL_SUBJECT;
    sendSmtpEmail.htmlContent = htmlMail;

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return true
  } catch (error) {
    logger.error(JSON.stringify(error))
    throw new Error('Error sending reset code to the email!');
  }
}

const getPasswordResetCodeHTMLMail = (receiver: string, code: string) => {
  let htmlMail = fs.readFileSync(path.join(__dirname + './../assets/htmlMail/PasswordResetCodeMail.html'), 'utf8')

  htmlMail = htmlMail.replace(CONSTANTS.RECEIVER_EMAIL_HOLDER, receiver)
  htmlMail = htmlMail.replace(CONSTANTS.PASSWORD_RESET_CODE_HOLDER, code)

  return htmlMail;
}

const getAfterPasswordResetHTMLMail = (receiver: string) => {
  let htmlMail = fs.readFileSync(path.join(__dirname + './../assets/htmlMail/AfterPasswordResetMail.html'), 'utf8')

  htmlMail = htmlMail.replace(CONSTANTS.RECEIVER_EMAIL_HOLDER, receiver)

  return htmlMail;
}

const getWaitingListJoinedHTMLMail = (receiver: string) => {
  let htmlMail = fs.readFileSync(path.join(__dirname + './../assets/htmlMail/WaitingListJoinedMail.html'), 'utf8')

  htmlMail = htmlMail.replace(CONSTANTS.RECEIVER_EMAIL_HOLDER, receiver)

  return htmlMail;
}