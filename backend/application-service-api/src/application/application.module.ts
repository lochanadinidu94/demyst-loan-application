import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { DbConnectionModule } from './db/db-connection.module';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService, DbConnectionModule],
})
export class ApplicationModule {}
