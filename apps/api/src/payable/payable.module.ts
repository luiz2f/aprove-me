import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { PayableRepository } from './payable.repository';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [PayableController],
  providers: [PayableService, PayableRepository, DatabaseService],
})
export class PayableModule {}
