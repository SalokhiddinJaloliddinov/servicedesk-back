import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRequestModule } from './user_request/user_request.module';
import { UserRequestEntity } from './user_request/entities/user_request.entity';
import { AuthModule } from './auth/auth.module';
import { AuthEntity } from './auth/entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { PersonModule } from './person/person.module';
import { TeamModule } from './team/team.module';
import { PersonEntity } from './person/entities/person.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'itop_anorbank',
      entities: [UserRequestEntity, AuthEntity, PersonEntity],
      synchronize: false,
    }),
    UserRequestModule,
    AuthModule,
    PersonModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
