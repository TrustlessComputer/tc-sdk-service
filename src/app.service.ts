import {Injectable} from '@nestjs/common';
import {createTx} from "tc-js";
import {BigNumber} from "bignumber.js";
import {CreateTxDto} from "./create-tx.dto";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createTxFromSDK(dto: CreateTxDto): Object {
    dto.privateKey =  Buffer.from(dto.privateString)
    dto.sendAmount = BigNumber(dto.sendAmount)
    let resp = createTx(
      dto.privateKey, dto.utxos, dto.inscriptions, dto.sendInscriptionID, dto.receiverInsAddress, dto.sendAmount, dto.feeRatePerByte, false
    )
    return {
      "data": resp
    }
  }
}
