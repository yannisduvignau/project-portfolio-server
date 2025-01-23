import emailjs from '@emailjs/browser';

export class MailerService {
  private readonly serviceId: string = process.env.MAIL_SERVICE_ID;
  private readonly templateIdAccountCreated: string =
    process.env.MAIL_TEMPLATE_FOR_CREATE_ACCOUNT;
  private readonly templateIdContact: string =
    process.env.MAIL_TEMPLATE_FOR_CONTACT;
  private readonly templateIdPasswordReset: string =
    process.env.MAIL_TEMPLATE_FOR_PASSWORD_RESET;
  private readonly publicKey: string = process.env.MAIL_PUBLIC_API_KEY;

  async sendContactEmail({
    recipient,
    firstname,
  }: {
    recipient: string;
    firstname: string;
  }) {
    try {
      const templateParams = {
        recipient,
        firstname,
        from_name: 'Portfolio',
        message: `Bonjour ${firstname}, et bienvenue sur NestJS Chat ! Nous sommes heureux de vous avoir parmi nous.`,
      };

      const response = await emailjs.send(
        this.serviceId,
        this.templateIdAccountCreated,
        templateParams,
        this.publicKey,
      );
      console.log('Email sent successfully:', response);
    } catch (error) {
      console.error('Failed to send created account email:', error);
    }
  }

  async sendCreatedAccountEmail({
    recipient,
    firstname,
  }: {
    recipient: string;
    firstname: string;
  }) {
    try {
      const templateParams = {
        recipient,
        firstname,
        from_name: 'Portfolio',
        message: `Bonjour ${firstname}, et bienvenue sur NestJS Chat ! Nous sommes heureux de vous avoir parmi nous.`,
      };

      const response = await emailjs.send(
        this.serviceId,
        this.templateIdAccountCreated,
        templateParams,
        this.publicKey,
      );
      console.log('Email sent successfully:', response);
    } catch (error) {
      console.error('Failed to send created account email:', error);
    }
  }

  async sendRequestedPasswordEmail({
    recipient,
    firstname,
    token,
  }: {
    recipient: string;
    firstname: string;
    token: string;
  }) {
    try {
      const link = `${process.env.FRONTEND_URL}/forgot-password?token=${token}`;
      const templateParams = {
        recipient,
        firstname,
        link,
        from_name: 'Acme',
        message: `Bonjour ${firstname}, voici votre lien de réinitialisation de mot de passe : ${link}`,
      };

      const response = await emailjs.send(
        this.serviceId,
        this.templateIdPasswordReset,
        templateParams,
        this.publicKey,
      );
      console.log('Password reset email sent successfully:', response);
    } catch (error) {
      console.error('Failed to send password reset email:', error);
    }
  }
}
