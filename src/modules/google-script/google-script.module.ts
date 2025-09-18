import { Module } from '@nestjs/common';
import { GoogleScriptService } from './google-script.service';
import { GoogleScriptController } from './google-script.controller';

@Module({
  controllers: [GoogleScriptController],
  providers: [GoogleScriptService],
})
export class GoogleScriptModule {}
