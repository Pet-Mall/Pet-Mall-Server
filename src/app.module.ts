import { AuthModule } from './logical/auth/auth.module';
import { DbModule } from './../libs/@libs/db/src/db.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from './modules/pet/petstore.module';
import { AdminModule } from './modules/admin/admin.module';
import { AdminController } from './modules/admin/admin.controller';
import { SystemLogsModule } from './modules/system-logs/system-logs.module';

@Module({
  imports: [PetModule, DbModule, AdminModule, AuthModule, SystemLogsModule],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule {}
