import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Admin } from 'src/modules/admin/models/admin.model';
import { Pet } from 'src/modules/pet/models/petstore.model';
import { SystemLog } from 'src/modules/system-logs/models/system-log.model';
const models = TypegooseModule.forFeature([Pet, Admin, SystemLog]);
@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/pet-mall-server'),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
