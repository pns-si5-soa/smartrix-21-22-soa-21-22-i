import { Controller,Get, Param, Query } from '@nestjs/common';
import { HousesService } from 'src/services/houses/houses.service';


@Controller('consumption')
export class ConsumptionController {
    constructor(private readonly housesService: HousesService) {}

    @Get("global")
    getConsumption(@Query("houseId") houseId:string): number {
        var consumption = this.housesService.getTotalConsumption(houseId);
        console.log("[consumption/global][getConsumption] houseId:string " +houseId + " => number ");
        console.log("controller consumption global: "+consumption)
        return consumption;
    }

}
