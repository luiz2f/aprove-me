import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AssignorRepository } from './assignor.repository';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [AssignorController],
  providers: [AssignorService, AssignorRepository, DatabaseService],
  imports: [DatabaseModule],
})
export class AssignorModule {}
