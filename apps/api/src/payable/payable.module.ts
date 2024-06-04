import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { PayableRepository } from './payable.repository';
import { DatabaseService } from '../database/database.service';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PayableController],
  providers: [PayableService, PayableRepository, DatabaseService],
})
export class PayableModule {}
