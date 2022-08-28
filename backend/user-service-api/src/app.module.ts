import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DbConnectionModule } from './user/db/db-connection.module';


@Module({
  imports: [UserModule],
  providers: [DbConnectionModule],
})
export class AppModule {}
