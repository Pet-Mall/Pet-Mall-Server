import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Pet } from 'src/modules/pet/models/pet.model';
import { Admin } from 'src/modules/admin/models/admin.model';
const models = TypegooseModule.forFeature([
  Pet,
  Admin
]);
@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/pet-mall-server'),
    models
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule { }
