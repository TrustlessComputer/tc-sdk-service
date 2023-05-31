import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  HttpCode,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateTxDto, InscribeTxDto } from "./create-tx.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("create-tx")
  @HttpCode(200)
  createTx(
    @Query() queries: any,
    @Param() params: any,
    @Body() createTxDto: CreateTxDto
  ): Object {
    console.log({ params });
    console.log(createTxDto);
    return this.appService.createTxFromSDK(createTxDto);
  }

  @Post("inscribe-tx")
  @HttpCode(200)
  inscribeTx(
    @Query() queries: any,
    @Param() params: any,
    @Body() inscribeTxDto: InscribeTxDto
  ): Object {
    console.log({ params });
    console.log(inscribeTxDto);
    return this.appService.inscribeTxFromSDK(inscribeTxDto);
  }
}
