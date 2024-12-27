import { Inscription, UTXO, PaymentInfo, InscPaymentInfo, DUTXO } from "tc-js";

import BigNumber from "bignumber.js";

export class CreateTxDto {
  network: Number;
  privateString: string;
  senderAddress: string;
  utxos: UTXO[];
  inscriptions: {
    [key: string]: Inscription[];
  };
  sendInscriptionID: string | undefined;
  receiverInsAddress: string;
  sendAmount: BigNumber;
  feeRatePerByte: number;
}

export class CreateTxExposeDto {
  AdminKey: string;
  network: Number;
  privateString: string;
  senderAddress: string;
  utxos: UTXO[];
  inscriptions: {
    [key: string]: Inscription[];
  };
  sendInscriptionID: string | undefined;
  receiverInsAddress: string;
  sendAmount: BigNumber;
  feeRatePerByte: number;
}

export class InscribeTxDto {
  network: Number;
  privateString: string; // wif private key
  senderAddress: string;
  utxos: UTXO[];
  inscriptions: {
    [key: string]: Inscription[];
  };
  data: string;
  feeRatePerByte: number;
}

export class CreateTxSendMultiDto {
  network: Number;
  privateString: string;
  senderAddress: string;
  utxos: UTXO[];
  inscriptions: {
    [key: string]: Inscription[];
  };
  sendInscriptionID: string | undefined;
  paymentInfos: PaymentInfo[];
  feeRatePerByte: number;
}


export class CreateTxSendMultiInscDto {
  network: Number;
  privateString: string;
  senderAddress: string;
  utxos: UTXO[];
  inscriptions: {
    [key: string]: Inscription[];
  };
  inscPaymentInfos: InscPaymentInfo[];
  paymentInfos: PaymentInfo[];
  feeRatePerByte: number;
}

export class CreateRawTxTransferSRC20Dto {
  network: Number;
  publicKey: string;
  senderAddress: string;
  utxos: UTXO[];
  inscriptions: {
    [key: string]: Inscription[];
  };
  data: string;
  paymentInfos: PaymentInfo[];
  feeRatePerByte: number;
  receiverAddress: string;
}

export class CreateTransferSRC20ScriptDto {
  secretKey: string;
  data: string;
}

export class CreateOrdInscImgDto {
  network: Number;
  privateString: string;
  senderAddress: string;
  utxos: UTXO[];
  inscriptions: {
    [key: string]: Inscription[];
  };
  data: string; // hex encode
  contentType: string;
  feeRatePerByte: number;
  receiverAddress: string;
}


export class CreateOrdInscGeneralDto {
  network: Number;
  privateString: string;
  senderAddress: string;
  utxos: UTXO[];
  inscriptions: {
    [key: string]: Inscription[];
  };
  data: string; // hex encode
  contentType: string;
  feeRatePerByte: number;
  // receiverAddress: string;

  metaProtocol: string;
  parentInscTxID: string;
  parentInscTxIndex: number;
  parentUTXO: UTXO;
}


// ******** Ripple func ******** //

export class XRPLCreateInscribeTxsDto {
  senderSeed: string;
  receiverAddress: string;
  amount: string;
  data: string;  // hex encode
  encodeVersion: number;
  fee?: string;
  rpcEndpoint: string;
  protocolID: string;
}



// ******** DOGE func ******** //

export class DOGECreateInscribeTxsDto {
  network: number;
  senderPrivKey: string;
  senderAddress: string;
  receiverAddress: string;
  data: string;
  contentType: string;
  utxos: DUTXO[];
  feeRate?: number;
  rpcEndpoint?: string;
}

