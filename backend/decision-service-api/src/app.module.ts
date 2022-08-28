import { Module } from '@nestjs/common';
import { ApprovalModule } from './approval/approval.module';


@Module({
  imports: [ApprovalModule],
})
export class AppModule {}
