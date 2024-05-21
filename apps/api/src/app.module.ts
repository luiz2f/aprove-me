import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    DatabaseModule,
    PayableModule,
    AssignorModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
