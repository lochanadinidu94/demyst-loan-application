import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DbConnectionModule } from './db/db-connection.module';

@Module({
  controllers: [UserController],
  providers: [UserService, DbConnectionModule]
})
export class UserModule {}
