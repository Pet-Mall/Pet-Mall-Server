import { PartialType } from '@nestjs/swagger';
import { CreateSystemLogDto } from './create-system-log.dto';

export class UpdateSystemLogDto extends PartialType(CreateSystemLogDto) {}
