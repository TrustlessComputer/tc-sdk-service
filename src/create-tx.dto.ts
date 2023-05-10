import {Inscription, UTXO} from "tc-js";
import BigNumber from "bignumber.js";

export class CreateTxDto {
  privateKey: Buffer;
  utxos: UTXO[];
  inscriptions: {
    [key: string]: Inscription[];
  };
  sendInscriptionID: string | undefined;
  receiverInsAddress: string;
  sendAmount: BigNumber;
  feeRatePerByte: number;
}