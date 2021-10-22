import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BillService } from 'src/services/bill/bill.service';

@Controller('bill')
export class BillController {

    constructor(private billService:BillService){}

    @Get("all-bill-for-house")
    getAllBillForHouse(@Query("houseID") houseID:string){
        this.billService.getAllBillForHouse(houseID)
    }

    @Get("bill-for-house")
    getSpecificBillForHouse(@Query("houseID") houseID:string,@Query("year",ParseIntPipe) year:number,@Query("month",ParseIntPipe) month:number){
        this.billService.getBill(houseID,year,month)
    }

    //la facture courante du mois (pas forcement complete si le mois est pas fini)
    //utiliser uniquement si necessaire
    // @Get("generate-temporar-bill")
    // async generateCurrentBill(@Query("houseID") houseID:string,@Query("year",ParseIntPipe) year:number,@Query("month",ParseIntPipe) month:number){
    //     var client = await this.billService.getHouseRegistry(houseID);
    //     var temporarBill;
    //     if(houseID){
    //         temporarBill = this.billService.createBillForClient(client,year,month)
    //     }
    //     return temporarBill
    // }
}
