import { Module } from '@nestjs/common';
import { SystemLogsService } from './system-logs.service';
import { SystemLogsController } from './system-logs.controller';

@Module({
  controllers: [SystemLogsController],
  providers: [SystemLogsService]
})
export class SystemLogsModule {}
