import {Controller, Get, Post, Param, Body, Query} from '@nestjs/common';
import {AppService} from './app.service';
import {CreateTxDto} from "./create-tx.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create-tx')
  createTx(@Query() queries: any, @Param() params: any, @Body() createTxDto: CreateTxDto): Object {
    console.log({params});
    console.log(createTxDto);
    return this.appService.createTxFromSDK(createTxDto);
  }
}
