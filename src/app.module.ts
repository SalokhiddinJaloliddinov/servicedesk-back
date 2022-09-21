import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { UserRequestModule } from './user_request/user_request.module';
import { UserRequestEntity } from './user_request/entities/user_request.entity';
import { AuthModule } from './auth/auth.module';
import { AuthEntity } from './auth/entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'itop_anorbank',
      entities: [UserEntity, UserRequestEntity, AuthEntity],
      synchronize: false,
    }),
    UserModule,
    UserRequestModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
