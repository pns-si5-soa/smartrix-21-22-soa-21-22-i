import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientRegistryController } from './controllers/client-registry/client-registry.controller';
import { Client } from './models/Client';
import { ClientData } from './models/ClientData';
import { ClientRegistryService } from './services/client-registry/client-registry.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client,ClientData]),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'database',
    port: 5432,
    username: 'SI5-SOA',
    password: 'SI5-SOA',
    database: 'SI5-SOA',
    entities: [Client,ClientData],
    synchronize: true,
  })],
  controllers: [AppController, ClientRegistryController],
  providers: [AppService, ClientRegistryService],
})
export class AppModule {}
