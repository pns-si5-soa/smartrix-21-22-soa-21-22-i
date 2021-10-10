import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { response } from 'express';
import { firstValueFrom } from 'rxjs';
import { House } from 'src/models/house';
import { ScheduledHouseObject } from 'src/models/house-object';

@Injectable()
export class HousesService {
    private URL_PUSH_CONSUMPTION = "http://consumption-manager:3008/add-detailed-consumption"
    private URL_PUSH_PRODUCTION = "http://production-manager:3006/add-production"

    private URL_TIME_SLOT = "http://scheduler:3002/schedule"
    private URL_REGISTER_NEW_HOUSE = "http://registry-manager:3003/subscription/client"
    private URL_REGISTER_NEW_PRODUCER = "http://registry-manager:3003/subscription/producer"

    private allHouse:Map<string,House> = new Map();
    private currentDate : Date;

    constructor(private http:HttpService){}


    doTick(date:Date){
        this.currentDate = date;
        this.pushAllHouseConsumption();
        this.pushAllHouseProduction();
    }

    getTotalConsumption(houseID:string){
        return this.allHouse.get(houseID)?.getTotalConsumption(this.currentDate);
    }

    getAllConsumption(houseID:string){
        var currentHouse = this.allHouse.get(houseID);
        currentHouse.getAllObject();

    }

    async pushConsumption(house:House){
        var jsonHouseDetailed = [];
        for(let object of house.getAllObject()){
            var consumption = object.getCurrentConsumption(this.currentDate)
            if(consumption>0){
                jsonHouseDetailed.push({idHouse:house.getHouseId(),dateConsumption:this.currentDate,objectName:object.getName(),consumption:object.getCurrentConsumption(this.currentDate)})
            }
        }
        this.http.post(this.URL_PUSH_CONSUMPTION,{param:jsonHouseDetailed}).subscribe({
            next : (response)=> console.log(response),
            error : (error)=> console.error(error),
        }
        );
    }

    public pushAllHouseConsumption(){
        for(let houseEntry of this.allHouse){
            this.pushConsumption(houseEntry[1])
        }
    }

    async pushProduction(house:House){
        var jsonHouseDetailed = [];
        for(let object of house.getAllObject()){
            var consumption = object.getCurrentConsumption(this.currentDate)
            if(consumption<0){
                jsonHouseDetailed.push({idHouse:house.getHouseId(),dateConsumption:this.currentDate,objectName:object.getName(),consumption:-object.getCurrentConsumption(this.currentDate)})
            }
        }
        this.http.post(this.URL_PUSH_PRODUCTION,{param:jsonHouseDetailed}).subscribe({
            next : (response)=> console.log(response),
            error : (error)=> console.error(error),
        }
        );
    }

    public pushAllHouseProduction(){
        for(let houseEntry of this.allHouse){
            if(houseEntry[1].getProducerId()){
                this.pushConsumption(houseEntry[1])
            }
        }
    }

    public async registryNewProducter(clientName:string):Promise<string>{
        return (await firstValueFrom(this.http.post(this.URL_REGISTER_NEW_PRODUCER, { producer_id: clientName }))).data
    }

    public async registryNewClient(clientName:string):Promise<string>{
        return (await firstValueFrom(this.http.post(this.URL_REGISTER_NEW_HOUSE, { client_name: clientName }))).data
    }


    public async requestTimeSLot(object: ScheduledHouseObject):Promise<any>{
        var timeSlot:{start:string,end:string} = await firstValueFrom(this.http.get(this.URL_TIME_SLOT,{params:{time:object.getTimeChargeNeed(),consumption:object.getMaxConsumption()}})).then((response)=>response.data)
        object.getTimeSlot().addSlots(new Date(timeSlot.start),new Date(timeSlot.end))
        return timeSlot;
    }

    public getHouse(clientId:string):House{
        return this.allHouse.get(clientId);
    }
    public addHouse(house:House){
        return this.allHouse.set(house.getHouseId(),house);
    }

    public getCurrentDate():Date{
        return this.currentDate;
    }
}
