import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductionServiceStorage {
    private URL_RegisteryManager = "http://registry-manager:3003/subscription/producerSubscribe";
    private URL_PUSH_PRODUCTION = "http://production-provider:3006/add-production"
    constructor(private http:HttpService){}
    dictProducer = {}
    dictProducerLimit = {}

    getProducer(producerName:string){
        console.log("Production registred with info name : " + producerName);
        return this.dictProducer[producerName];
        }
    
    setProduction(newProduction:number){
        console.log("Production set with production value : " + newProduction + " W.");
        for(var key in this.dictProducer) {
            this.dictProducer[key].production+=newProduction;
            break;
            }
        }


    getProducerLimit(producerName:string){
        console.log("Production Limit registred with info name : " + producerName);
        return this.dictProducerLimit[producerName];
        }
    
    setProductionLimit(newProductionLimit:number){
        console.log("Production Limit set with production value : " + newProductionLimit + " W.");
        for(var key in this.dictProducer) {
            this.dictProducerLimit[key].productionLimit+=newProductionLimit;
            break;
            }
        }

    async addSupplier(producerName:string,production:number){
        var message = {producerName:producerName};
        var reponse;
        reponse = (await firstValueFrom(this.http.post(this.URL_RegisteryManager,message))).data
        this.dictProducerLimit[producerName]={id_producer:reponse,productionLimit:500}; //par defaut la limite est à 500
        this.dictProducer[producerName]={id_producer:reponse,production:production};
        return reponse;
    }
    
    async pushProduction(producerName:string,date:string){
        var jsonProduction = {id_producer:this.dictProducer[producerName].id_producer,productionDate:new Date(date),production:this.dictProducer[producerName].production};
        console.log("push to production provider : "+JSON.stringify(jsonProduction))
        this.http.post(this.URL_PUSH_PRODUCTION,{production:jsonProduction}).subscribe({
            next : (response)=> console.log(response.data),
            error : (error)=> console.error("error :("),
        })
    }
    
    async pushProductionLimit(producerName:string,date:string){
        var jsonProductionLimit = {id_producer:this.dictProducerLimit[producerName].id_producer,productionDate:new Date(date),productionLimit:this.dictProducerLimit[producerName].productionLimit,production:this.dictProducerLimit[producerName].production};
        console.log("push limit to production provider : "+JSON.stringify(jsonProductionLimit))
        this.http.post(this.URL_PUSH_PRODUCTION+"-limit",{productionLimit:jsonProductionLimit}).subscribe({
            next : (response)=> console.log(response.data),
            error : (error)=> console.error("error :("),
        })
    }
    async pushAllProduction(date:string){
        for(var key in this.dictProducer) {
            this.pushProduction(key,date);
        }
    }
    async pushAllProductionLimit(date:string){
        for(var key in this.dictProducerLimit) {
            this.pushProductionLimit(key,date);
        }
    }   
}