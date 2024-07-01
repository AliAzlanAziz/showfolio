import * as SibApiV3Sdk from '@sendinblue/client';
import { SendSmtpEmail } from '@sendinblue/client';
import * as fs from 'fs';
import { CONSTANTS } from '../constants/constants';
import * as dotenv from 'dotenv';

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
    console.log(error)
    throw new Error('Error sending reset code to the email!');
  }
}

const getPasswordResetCodeHTMLMail = (receiver: string, code: string) => {
  let htmlMail = fs.readFileSync(__dirname + './../assets/htmlMail/PasswordResetCodeMail.html', 'utf8')

  htmlMail = htmlMail.replace(CONSTANTS.RECEIVER_EMAIL_HOLDER, receiver)
  htmlMail = htmlMail.replace(CONSTANTS.PASSWORD_RESET_CODE_HOLDER, code)

  return htmlMail;
}

const getAfterPasswordResetHTMLMail = (receiver: string) => {
  let htmlMail = fs.readFileSync(__dirname + './../assets/htmlMail/AfterPasswordResetMail.html', 'utf8')

  htmlMail = htmlMail.replace(CONSTANTS.RECEIVER_EMAIL_HOLDER, receiver)

  return htmlMail;
}