import { Module } from '@nestjs/common';
import { PgModule } from './pg/pg.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PgModule, UserModule],
})
export class AppModule {}
