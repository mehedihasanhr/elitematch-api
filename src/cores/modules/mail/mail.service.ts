import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter | null = null;
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Compile an HTML template with Handlebars.
   */
  private compileTemplate(
    templateName: string,
    context: Record<string, any>,
  ): string {
    const templatePath = path.join(
      process.cwd(),
      'templates',
      `${templateName}.hbs`,
    );

    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const template = handlebars.compile(templateSource);
    return template(context);
  }

  /**
   * Initialize Nodemailer transporter from .env configuration.
   */
  private async initTransporter() {
    if (this.transporter) return; // already initialized
    const mailConfig = await this.prisma.mailConfig.findFirst();

    let host = this.config.get<string>('EMAIL_HOST');
    let port = this.config.get<number>('EMAIL_PORT');
    let user = this.config.get<string>('EMAIL_USER');
    let pass = this.config.get<string>('EMAIL_PASSWORD');

    if (mailConfig) {
      host = mailConfig.host;
      port = mailConfig.port;
      user = mailConfig.user;
      pass = mailConfig.password;
    }

    const transportOptions: SMTPTransport.Options & {
      pool?: boolean;
      maxConnections?: number;
      maxMessages?: number;
    } = {
      host,
      port,
      secure: port === 465,
      pool: true,
      maxConnections: 3,
      maxMessages: 100,
      auth: { user, pass },
    };

    this.transporter = nodemailer.createTransport(transportOptions);

    await this.transporter.verify();
  }

  /**
   * Send an email with a compiled Handlebars template.
   */
  async sendMail(
    to: string,
    subject: string,
    templateName: string,
    context: Record<string, any>,
  ): Promise<nodemailer.SentMessageInfo> {
    await this.initTransporter();

    if (!this.transporter) {
      throw new Error('Transporter not initialized');
    }

    const from =
      this.config.get<string>('EMAIL_FROM') ||
      this.config.get<string>('EMAIL_USER');
    const html = this.compileTemplate(templateName, context);

    return this.transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
  }

  /**
   * Fire-and-forget background email sending (non-blocking).
   */
  sendMailBackground(
    to: string,
    subject: string,
    templateName: string,
    context: Record<string, any>,
  ): void {
    setImmediate(() => {
      this.sendMail(to, subject, templateName, context).catch((err: any) => {
        this.logger.error(
          `Background email failed: ${subject} -> ${to}`,
          (err as Error)?.stack || err,
        );
      });
    });
  }
}
