import { Body, Controller, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {

    constructor(private SubscriptionService: SubscriptionService){}

    @Post("clientSubscribe")
    async clientSubscribe(@Body("clientName") clientName:string, @Body("privacyDetailedData") privacyDetailedData:boolean, 
    @Body("privacyConsumptionData") privacyConsumptionData:boolean, @Body("privacyProductionData") privacyProductionData:boolean):Promise<string>{
        console.log("[subscription][clientSubscribe] clientName:string "+ clientName + " => void");
        console.log("New client registration.\n");
        var response = await this.SubscriptionService.subscribeClient(clientName, privacyDetailedData, privacyConsumptionData, privacyProductionData);
        console.log("[subscription][clientSubscribe] return :"+ response)
        return response;
    }

    @Post("updateClientName")
    updateClientNameinDB(@Body("idHouse") idHouse:string, @Body("clientName") clientName:string){
        //console.log("[subscription/ip][clientSubscribe] ip:string "+ ip +" port:string "+ port +" => void")
        return this.SubscriptionService.updateClientNameinDB(idHouse, clientName);
    }

    @Post("producerSubscribe")
    producerSubscribe(@Body("producerName") producerName:string) {
        console.log("[subscription][producerSubscribe] producerName:string " + producerName + " => void\n");
        console.log("New producer registration.\n");
        return this.SubscriptionService.subscribeProducer(producerName);
    }

    @Post("updateProducerName")
    updateProducerNameinDB(@Body("producerID") producerID:string, @Body("producerNewName") producerNewName:string) {
        console.log("[subscription][updateProducerName] producerID:string " + producerID + " producerNewName:string "
        + producerNewName + " => void\n");
        return this.SubscriptionService.updateProducerNameinDB(producerID, producerNewName);
    }

    @Post("clientBecomeProducer")
    clientBecomeProducer(@Body("clientID") clientID:string): Promise<String> {
        console.log("[subscription][clientBecomeProducer] clientID:string " + clientID);
        return this.SubscriptionService.clientBecomeProducer(clientID);
    }

}
