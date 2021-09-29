import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetcommunityurlService } from './services/getcommunityurl/getcommunityurl.service';
import { GetallhouseurlService } from './services/getallhouseurl/getallhouseurl.service';
import { GethouseurlService } from './services/gethouseurl/gethouseurl.service';
import { FromregistryController } from './controller/fromregistry/fromregistry.controller';


@Module({
  imports: [],
  controllers: [AppController, FromregistryController],
  providers: [AppService, GetcommunityurlService, GetallhouseurlService, GethouseurlService],
})
export class AppModule {}
