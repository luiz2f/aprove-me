import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [AssignorController],
  providers: [AssignorService],
  imports: [DatabaseModule],
})
export class AssignorModule {}
