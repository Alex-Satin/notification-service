import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { SendEmailDto } from './common/interfaces/send-email.dto';

@Controller('emails')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('send-email')
  sendEmail(@Payload() payload: SendEmailDto, @Ctx() context: RmqContext) {
    return this.appService.sendEmail(payload);
  }
}
