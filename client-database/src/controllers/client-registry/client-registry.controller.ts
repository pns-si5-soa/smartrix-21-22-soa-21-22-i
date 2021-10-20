import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Client } from 'src/models/Client';
import { ClientRegistryService } from '../../services/client-registry/client-registry.service';

@Controller('client-registry')
export class ClientRegistryController {
  constructor(private clientRegistryService: ClientRegistryService) {}

  @Get('community')
  getCommunity(@Query('communityID') communityID: string): Promise<Client[]> {
    console.log("[ClientRegistryController][getCommunity] params: communityID:"+communityID)
    var value = this.clientRegistryService.getCommunity(+communityID);
    console.log("[ClientRegistryController][getCommunity] return: "+JSON.stringify(value))
    return value
  }

  @Get('house')
  getHouse(@Query('houseID') houseID: string): Promise<Client> {
    return this.clientRegistryService.getClient(houseID);
  }

  @Get('allHouses')
  getAllHouses(): Promise<Client[]> {
    return this.clientRegistryService.getAllClients();
  }

  @Post('subscribe')
  clientSubscribe(
    @Body('clientName') clientName: string,
    @Body('communityID') communityID: number,
  ): Promise<string> {
    console.log(
      '[client-registry][clientSubscribe] clientName:string ' +
        clientName +
        '=> void',
    );
    return this.clientRegistryService.subscribeClient(clientName, communityID);
  }

  @Post('updateClientName')
  updateName(
    @Body('idClient') idClient: string,
    @Body('newClientName') newClientName: string,
  ) {
    return this.clientRegistryService.updateClientName(
      idClient,
      newClientName,
    );
  }

  @Post('updateClientProducerID')
  updateClientProducerID(@Body('idClient') idClient: string, @Body('producerID') producerID: string) {
    return this.clientRegistryService.updateClientProducerID(idClient, producerID);
  }
}
