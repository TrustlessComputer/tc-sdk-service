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
import { CreateTxDto, InscribeTxDto, CreateTxExposeDto, CreateTxSendMultiDto, CreateTxSendMultiInscDto, CreateRawTxTransferSRC20Dto, CreateTransferSRC20ScriptDto, CreateOrdInscImgDto } from "./create-tx.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

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
    let privateKey = createTxDto.privateString;
    createTxDto.privateString = "";
    console.log(createTxDto);
    createTxDto.privateString = privateKey;
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

    let privateKey = inscribeTxDto.privateString;
    inscribeTxDto.privateString = "";
    inscribeTxDto.privateString = privateKey;
    return this.appService.inscribeTxFromSDK(inscribeTxDto);
  }

  @Post("inscribezkproof-tx")
  @HttpCode(200)
  inscribeZKProofTx(
    @Query() queries: any,
    @Param() params: any,
    @Body() inscribeTxDto: InscribeTxDto
  ): Object {

    let privateKey = inscribeTxDto.privateString;
    inscribeTxDto.privateString = "";
    inscribeTxDto.privateString = privateKey;
    return this.appService.inscribeZKProofTxFromSDK(inscribeTxDto);
  }

  @Post("create-tx-expose")
  @HttpCode(200)
  createTxExpose(
    @Query() queries: any,
    @Param() params: any,
    @Body() createTxDto: CreateTxExposeDto
  ): Object {
    console.log({ params });

    let privateKey = createTxDto.privateString;
    createTxDto.privateString = "";
    console.log(createTxDto);
    createTxDto.privateString = privateKey;

    if (createTxDto.AdminKey != process.env.ADMIN_KEY) {
      return {
        data: "Invalid Admin Key",
      };
    }
    return this.appService.createTxFromSDK(createTxDto);
  }

  @Post("create-tx-send-btc-multi")
  @HttpCode(200)
  createTxSendBTCMulti(
    @Query() queries: any,
    @Param() params: any,
    @Body() createTxSendMultiDto: CreateTxSendMultiDto
  ): Object {
    console.log({ params });

    let privateKey = createTxSendMultiDto.privateString;
    createTxSendMultiDto.privateString = "";
    console.log(createTxSendMultiDto);
    createTxSendMultiDto.privateString = privateKey;

    return this.appService.createTxSendMultiFromSDK(createTxSendMultiDto);
  }


  @Post("create-tx-send-insc-multi")
  @HttpCode(200)
  createTxSendInscMulti(
    @Query() queries: any,
    @Param() params: any,
    @Body() createTxSendMultiDto: CreateTxSendMultiInscDto
  ): Object {
    console.log({ params });

    let privateKey = createTxSendMultiDto.privateString;
    createTxSendMultiDto.privateString = "";
    console.log(createTxSendMultiDto);
    createTxSendMultiDto.privateString = privateKey;

    return this.appService.createTxSendMultiInscFromSDK(createTxSendMultiDto);
  }

  @Post("create-raw-tx-transfer-src20")
  @HttpCode(200)
  createRawTxTransferSRC20(
    @Query() queries: any,
    @Param() params: any,
    @Body() createRawTxTransferSRC20Dto: CreateRawTxTransferSRC20Dto
  ): Object {
    console.log({ params });
    console.log(createRawTxTransferSRC20Dto);

    return this.appService.createRawTxTransferSRC20FromSDK(createRawTxTransferSRC20Dto);
  }

  @Post("create-transfer-src20-script")
  @HttpCode(200)
  createTransferSRC20Script(
    @Query() queries: any,
    @Param() params: any,
    @Body() createTransferSRC20ScriptDto: CreateTransferSRC20ScriptDto
  ): Object {
    console.log({ params });
    console.log(createTransferSRC20ScriptDto);

    return this.appService.createTransferSRC20ScriptFromSDK(createTransferSRC20ScriptDto);
  }

  @Post("create-ord-insc-img")
  @HttpCode(200)
  createOrdInscImg(
    @Query() queries: any,
    @Param() params: any,
    @Body() createOrdInscImgDto: CreateOrdInscImgDto
  ): Object {
    console.log({ params });

    let privateKey = createOrdInscImgDto.privateString;
    createOrdInscImgDto.privateString = "";
    console.log(createOrdInscImgDto);
    createOrdInscImgDto.privateString = privateKey;

    return this.appService.createOrdInscImg(createOrdInscImgDto);
  }
}
