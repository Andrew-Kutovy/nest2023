import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CustomConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [],
    }),
  ],
  providers: [CustomConfigService, ConfigService],
  exports: [CustomConfigService, ConfigService]
})
export class CustomConfigModule {}
