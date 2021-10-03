import { Controller, Get, Query } from '@nestjs/common';
import { ConsumptionCheckService } from 'src/services/consumption-check/consumption-check.service';

@Controller('consumption-check')
export class ConsumptionCheckController {
    constructor(private readonly consumptionCheckService: ConsumptionCheckService) {}

    @Get()
    checkIfConsumptionEqualsProduction(@Query('date') dateString:Date): Promise<boolean> {
        var date = dateString;
        console.log("[consumption-check][checkIfConsumptionEqualsProduction] dateString:Date "+ dateString +" => Promise<boolean>");
        

        return this.consumptionCheckService.verifyProductionVsConsumption(date);
    }
}
