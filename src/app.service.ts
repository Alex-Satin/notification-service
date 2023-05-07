import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './common/interfaces/send-email.dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger();

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(dto: SendEmailDto) {
    try {
      await this.mailerService.sendMail({
        from: this.configService.get('emails.transport.auth.user'),
        to: dto.to,
        subject: dto.subject,
        text: dto.text,
      });

      this.logger.log(`Email to ${dto.to} has been successfully sended`);
    } catch (err) {
      this.logger.error(err, '', `EmailsService::sendEmail`);
    }
  }
}
