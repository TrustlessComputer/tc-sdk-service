import { convertPrivateKeyFromStr, createTx } from "tc-js";

import { BigNumber } from "bignumber.js";
import { CreateTxDto } from "./create-tx.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  createTxFromSDK(dto: CreateTxDto): Object {
    const privateKey = convertPrivateKeyFromStr(dto.privateString);
    // dto.sendAmount = BigNumber(dto.sendAmount);
    let params = {
      senderPrivateKey: privateKey,
      senderAddress: dto.senderAddress,
      utxos: dto.utxos,
      inscriptions: dto.inscriptions,
      sendInscriptionID: dto.sendInscriptionID,
      receiverInsAddress: dto.receiverInsAddress,
      sendAmount: dto.sendAmount,
      feeRatePerByte: dto.feeRatePerByte,
      isUseInscriptionPayFeeParam: false,
    };
    let resp = createTx(params);
    return {
      data: resp,
    };
  }
}
