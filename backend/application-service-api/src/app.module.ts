import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { DbConnectionModule } from './application/db/db-connection.module';

@Module({
  imports: [ApplicationModule],
  providers: [DbConnectionModule],
})
export class AppModule {}
