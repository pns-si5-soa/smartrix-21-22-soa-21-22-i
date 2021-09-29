import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CommunitieConsumptionService {
    private dataServiceURL: string

    constructor(private httpService: HttpService) {
        this.dataServiceURL = "http://DATASERVICE:3000/GETCOMMUNITIEURL";
    }

    public async getHouseConsumption(date:Date, houseURL:string): Promise<number>{
        return firstValueFrom(this.httpService.get(await houseURL, {params: {date:date}})).then(body=>body.data);
    }

    public getHousesURLFromCommunitieID(ID:number): Promise<string[]>{
        return firstValueFrom(this.httpService.get(this.dataServiceURL, {params: {ID:ID}})).then(body=>body.data);
    }

    async getCommunitieConsumption(date:Date, communitieID:number): Promise<number> {
        var consumptionSum = 0;
        var housesURL: Promise<string[]> = this.getHousesURLFromCommunitieID(communitieID);
        
        await housesURL.then(
            (houses)=> houses.forEach(
                async (houseURL)=> consumptionSum += await this.getHouseConsumption(date, houseURL)
            ));

        return consumptionSum;
    }
}