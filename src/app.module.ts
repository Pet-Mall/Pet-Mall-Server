import { DbModule } from './../libs/@libs/db/src/db.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from './pet/pet.module';

@Module({
  imports: [PetModule,DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
