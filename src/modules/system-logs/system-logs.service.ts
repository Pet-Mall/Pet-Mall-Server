import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { SystemLog as SystemLogsecma } from "./models/system-log.model"
import { CreateSystemLogDto } from './dto/create-system-log.dto';
import { UpdateSystemLogDto } from './dto/update-system-log.dto';
import { QuerySystemLogDto } from './dto/query-system-log.dto';

@Injectable()
export class SystemLogsService {
  constructor(
    @InjectModel(SystemLogsecma) private readonly SystemLogModel: ModelType<SystemLogsecma>,
  ) { }

  async customerPage(query: QuerySystemLogDto) {
    const { current, size } = query
    const skipCount: number = (current - 1) * size
    return this.SystemLogModel.find().limit(size).skip(skipCount);
  }

  async create(createSystemLogDto: CreateSystemLogDto) {
    return await this.SystemLogModel.create(createSystemLogDto);
  }
}