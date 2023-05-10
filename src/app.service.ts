import {Injectable} from '@nestjs/common';
import {createTx} from "tc-js";
import {CreateTxDto} from "./create-tx.dto";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createTxFromSDK(dto: CreateTxDto): Object {
    let resp = createTx(
      dto.privateKey, dto.utxos, dto.inscriptions, dto.sendInscriptionID, dto.receiverInsAddress, dto.sendAmount, dto.feeRatePerByte, false
    )
    return {
      "data": resp
    }
  }
}
