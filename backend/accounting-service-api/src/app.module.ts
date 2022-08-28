import { Module } from '@nestjs/common';
import { ThirdpartysoftwareModule } from './thirdpartysoftware/thirdpartysoftware.module';

@Module({
  imports: [ThirdpartysoftwareModule],
})
export class AppModule {}
