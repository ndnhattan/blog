import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './auth/role.guard';
import { AuthGuard } from './auth/auth.guard';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([User]),
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    PostModule,
    CategoryModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
