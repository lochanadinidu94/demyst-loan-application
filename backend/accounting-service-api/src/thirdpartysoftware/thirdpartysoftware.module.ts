import { Module } from '@nestjs/common';
import { ThirdpartysoftwareController } from './thirdpartysoftware.controller';
import { ThirdpartysoftwareService } from './thirdpartysoftware.service';

@Module({
  controllers: [ThirdpartysoftwareController],
  providers: [ThirdpartysoftwareService]
})
export class ThirdpartysoftwareModule {}
