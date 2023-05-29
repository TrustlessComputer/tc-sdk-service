import { Injectable } from "@nestjs/common";
import { createTx } from "tc-js";
import { BigNumber } from "bignumber.js";
import { CreateTxDto } from "./create-tx.dto";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  createTxFromSDK(dto: CreateTxDto): Object {
    dto.privateKey = Buffer.from(dto.privateString);
    dto.sendAmount = BigNumber(dto.sendAmount);
    let params = {
      senderPrivateKey: dto.privateKey,
      senderAddress: dto.senderAddress,
      utxos: dto.utxos,
      inscriptions: dto.inscriptions,
      sendInscriptionID: dto.sendInscriptionID,
      receiverInsAddress: dto.receiverInsAddress,
      sendAmount: dto.sendAmount,
      feeRatePerByte: dto.feeRatePerByte,
    };
    let resp = createTx(params);
    return {
      data: resp,
    };
  }
}
