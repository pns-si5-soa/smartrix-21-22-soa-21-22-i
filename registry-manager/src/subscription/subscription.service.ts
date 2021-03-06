import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SubscriptionService {
    private URL_SubscribeClientDB = "http://client-database:3004/client-registry/subscribe";
    private URL_UpdateNameClientDB = "http://client-database:3004/client-registry/updateClientName";
    private URL_SubscribeProducerDB = "http://producer-database:3010/producer-registry/subscribe";
    private URL_UpdateNameProducerDB = "http://producer-database:3010/producer-registry/updateProducerName";
    private URL_UpdateProducerIDClientDB = "http://client-database:3004/client-registry/updateClientProducerID";

    constructor(private http:HttpService){}

    ID_Community = 1;
    nbHouseInCommunity = 0;

    async subscribeClient(clientName:string, privacyDetailedData:boolean, privacyConsumptionData:boolean, privacyProductionData:boolean):Promise<string>{
        console.log("Client registred info : " + clientName + "." + "Accepted privacy detailed data : " + privacyDetailedData + 
        ", privacy consumption data : " + privacyConsumptionData + ", privacy production data : " + privacyProductionData);
        return this.generateClientSubscription(clientName, privacyDetailedData, privacyConsumptionData, privacyProductionData);
    }

    async updateClientNameinDB(idHouse:string, newClientName:string){
        var message = {idHouse, newClientName};

        await this.http.post(this.URL_UpdateNameClientDB, message).subscribe( {
            next: (value) => console.log("Data updated.\n"),
            error: (error) => console.log(error)
        })
        return;
    }

    async subscribeProducer(producerName:string) {
        console.log("Producer registered info : " + producerName);
        return await this.generateProducerSubscription(producerName);
    }

    async updateProducerNameinDB(idProducer:string, newProducerName:string) {
        var message = {idProducer, newProducerName};
        await this.http.post(this.URL_UpdateNameProducerDB, message).subscribe({
            next: (value) => console.log("Data stored\n"),
            error: (error) => console.log(error)
        })
    }

    async clientBecomeProducer(idClient: string): Promise<String> {
        var producerID = await this.generateProducerSubscription(idClient);
        await this.updateProducerIDinClientDB(idClient, producerID);
        return producerID;
    }
    
    private async updateProducerIDinClientDB(idClient:string, producerID:string) {
        var message = {idClient, producerID};
        console.log("[registry-manager][SubscriptionService][updateProducerIDinClientDB] I send to database : "+JSON.stringify(message))
        await this.http.post(this.URL_UpdateProducerIDClientDB, message).subscribe({
            next: (value) => console.log("Data updated\n"),
            error: (error) => console.log(error)
        })
        return;
    }
   
    private async generateProducerSubscription(producerName: string):Promise<string> {
        var id_producer = (await firstValueFrom(this.http.post(this.URL_SubscribeProducerDB, {producerName}))).data;
        return id_producer;
    }

    private async generateClientSubscription(clientName:string, privacyDetailedData:boolean, privacyConsumptionData:boolean, privacyProductionData:boolean):Promise<string>{
        var community_ID = this.giveCommunityID();
        var message = {clientName, communityID:community_ID, privacyDetailedData: privacyDetailedData, privacyConsumptionData: privacyConsumptionData, privacyProductionData: privacyProductionData};
        var client_id = (await firstValueFrom(this.http.post(this.URL_SubscribeClientDB, message))).data;
        return client_id;
    }

    private giveCommunityID():number {
        if (this.nbHouseInCommunity < 3) {
            this.nbHouseInCommunity++;
            return this.ID_Community;
        }
        else {
            this.ID_Community++;
            this.nbHouseInCommunity = 1;
            return this.ID_Community;
        }
    }
}
