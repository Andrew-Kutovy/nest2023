import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import {UserController} from "./user/user.controller";
import {UserService} from "./user/user.service";

@Module({
  imports: [UserModule, AuthModule, UserModule],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}