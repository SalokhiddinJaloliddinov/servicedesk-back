import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRequestModule } from './user_request/user_request.module';
import { AuthModule } from './auth/auth.module';
import { AuthEntity } from './auth/entities/auth.entity';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { ServiceModule } from './service/service.module';
import { ServiceEntity } from './service/entities/service.entity';
import { TicketModule } from './ticket/ticket.module';
import { IncidentEntity } from './ticket/entities/incident.entity';
import { UserRequestEntity } from './ticket/entities/user_request.entity';
import { DeliveryRequestEntity } from './ticket/entities/delivery_request.entity';
import { ContactModule } from './contact/contact.module';
import { ContactEntity } from './contact/entities/contact.entity';
import { PersonEntity } from './contact/entities/person.entity';
import { RolesModule } from './roles/roles.module';
import { LnkRoleToUserEntity } from './roles/entities/lnkRoleToUser.entity';
import { RolesEntity } from './roles/entities/roles.entity';
import { ServiceSubcategoryEntity } from './service/entities/service_subcategory.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'itop_anorbank',
      entities: [
        UserRequestEntity,
        AuthEntity,
        ServiceEntity,
        IncidentEntity,
        DeliveryRequestEntity,
        ContactEntity,
        PersonEntity,
        LnkRoleToUserEntity,
        RolesEntity,
        ServiceSubcategoryEntity,
      ],
      synchronize: false,
    }),
    UserRequestModule,
    AuthModule,
    ServiceModule,
    TicketModule,
    ContactModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
