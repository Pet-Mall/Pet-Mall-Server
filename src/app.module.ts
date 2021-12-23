import { DbModule } from './../libs/@libs/db/src/db.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from './modules/pet/pet.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [PetModule,DbModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
