import {
  CreateTxDto,
  InscribeTxDto,
  CreateTxSendMultiDto,
  CreateTxSendMultiInscDto,
  CreateRawTxTransferSRC20Dto,
  CreateTransferSRC20ScriptDto,
  CreateOrdInscImgDto,
  CreateOrdInscGeneralDto,
  XRPLCreateInscribeTxsDto,
  DOGECreateInscribeTxsDto,
} from "./app.dto";

import {
  NetworkType,
  convertPrivateKeyFromStr,
  createTx,
  createTxSendBTC,
  createTxSendMultiReceivers,
  ordCreateInscribeTx,
  setBTCNetwork,
  setupConfig,
  PaymentInfo,
  UTXO,
  Network,
  createTransferSRC20RawTx,
  createTransferSRC20Script,
  createInscribeImgTx,
  createInscribeTxGeneral,
  createInscribeTxs as xrplCreateInscribeTxs,
  dogeCreateInscribeTxs,
} from "tc-js";

import { BigNumber } from "bignumber.js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  createTxFromSDK(dto: CreateTxDto): Object {
    setupConfig({
      storage: undefined,
      tcClient: undefined,
      netType: dto.network.valueOf(),
    });

    const privateKey = convertPrivateKeyFromStr(dto.privateString);
    dto.sendAmount = new BigNumber(dto.sendAmount);
    let utxos: UTXO[] = [];
    dto.utxos.forEach((utxo) => {
      utxo.value = new BigNumber(utxo.value);
      utxos.push(utxo);
    });
    let params = {
      senderPrivateKey: privateKey,
      senderAddress: dto.senderAddress,
      utxos: utxos,
      inscriptions: dto.inscriptions,
      sendInscriptionID: dto.sendInscriptionID,
      receiverInsAddress: dto.receiverInsAddress,
      sendAmount: dto.sendAmount,
      feeRatePerByte: dto.feeRatePerByte,
      isUseInscriptionPayFeeParam: false,
    };
    try {
      let resp = createTx(params);
      return {
        data: resp,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async inscribeTxFromSDK(dto: InscribeTxDto): Promise<Object> {
    // if (dto.network === NetworkType.Mainnet) {
    //   global.tcBTCNetwork = networks.bitcoin;
    // } else if (dto.network === NetworkType.Testnet) {
    //   global.tcBTCNetwork = networks.testnet;
    // } else if (dto.network === NetworkType.Regtest) {
    //   global.tcBTCNetwork = networks.regtest;
    // }

    setupConfig({
      storage: undefined,
      tcClient: undefined,
      netType: dto.network.valueOf(),
    });
    setBTCNetwork(dto.network.valueOf());

    console.log("Network SDK: ", Network);

    const privateKey = convertPrivateKeyFromStr(dto.privateString);
    let utxos: UTXO[] = [];
    dto.utxos.forEach((utxo) => {
      utxo.value = new BigNumber(utxo.value);
      utxos.push(utxo);
    });
    let params = {
      senderPrivateKey: privateKey,
      senderAddress: dto.senderAddress,
      utxos: utxos,
      inscriptions: dto.inscriptions,
      feeRatePerByte: dto.feeRatePerByte,
      data: dto.data,
    };

    try {
      let resp = await ordCreateInscribeTx(params);
      return {
        data: resp,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  createTxSendMultiFromSDK(dto: CreateTxSendMultiDto): Object {
    setupConfig({
      storage: undefined,
      tcClient: undefined,
      netType: dto.network.valueOf(),
    });

    const privateKey = convertPrivateKeyFromStr(dto.privateString);

    let utxos: UTXO[] = [];
    dto.utxos.forEach((utxo) => {
      utxo.value = new BigNumber(utxo.value);
      utxos.push(utxo);
    });

    let paymentInfos: PaymentInfo[] = [];
    for (let i = 0; i < dto.paymentInfos.length; i++) {
      dto.paymentInfos[i].amount = new BigNumber(dto.paymentInfos[i].amount);
      paymentInfos.push(dto.paymentInfos[i]);
    }
    let params = {
      senderPrivateKey: privateKey,
      senderAddress: dto.senderAddress,
      utxos: utxos,
      inscriptions: dto.inscriptions,
      paymentInfos: paymentInfos,
      feeRatePerByte: dto.feeRatePerByte,
    };
    try {
      let resp = createTxSendBTC(params);
      return {
        data: resp,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  createTxSendMultiInscFromSDK(dto: CreateTxSendMultiInscDto): Object {
    setupConfig({
      storage: undefined,
      tcClient: undefined,
      netType: dto.network.valueOf(),
    });

    const privateKey = convertPrivateKeyFromStr(dto.privateString);

    let utxos: UTXO[] = [];
    dto.utxos.forEach((utxo) => {
      utxo.value = new BigNumber(utxo.value);
      utxos.push(utxo);
    });

    let paymentInfos: PaymentInfo[] = [];
    for (let i = 0; i < dto.paymentInfos.length; i++) {
      dto.paymentInfos[i].amount = new BigNumber(dto.paymentInfos[i].amount);
      paymentInfos.push(dto.paymentInfos[i]);
    }

    // TODO: check inscriptions format
    let params = {
      senderPrivateKey: privateKey,
      senderAddress: dto.senderAddress,
      utxos: utxos,
      inscriptions: dto.inscriptions,
      inscPaymentInfos: dto.inscPaymentInfos,
      paymentInfos: paymentInfos,
      feeRatePerByte: dto.feeRatePerByte,
    };
    try {
      let resp = createTxSendMultiReceivers(params);
      return {
        data: resp,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }


  createRawTxTransferSRC20FromSDK(dto: CreateRawTxTransferSRC20Dto): Object {
    setupConfig({
      storage: undefined,
      tcClient: undefined,
      netType: dto.network.valueOf(),
    });

    const publicKey = Buffer.from(dto.publicKey, "hex");

    let utxos: UTXO[] = [];
    dto.utxos.forEach((utxo) => {
      utxo.value = new BigNumber(utxo.value);
      utxos.push(utxo);
    });

    let paymentInfos: PaymentInfo[] = [];
    for (let i = 0; i < dto.paymentInfos.length; i++) {
      dto.paymentInfos[i].amount = new BigNumber(dto.paymentInfos[i].amount);
      paymentInfos.push(dto.paymentInfos[i]);
    }

    let params = {
      senderPubKey: publicKey,
      senderAddress: dto.senderAddress,
      utxos: utxos,
      inscriptions: dto.inscriptions,
      paymentInfos: paymentInfos,
      feeRatePerByte: dto.feeRatePerByte,
      receiverAddress: dto.receiverAddress,
      data: dto.data,
    };
    try {
      let resp = createTransferSRC20RawTx(params);
      return {
        data: resp,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  createTransferSRC20ScriptFromSDK(dto: CreateTransferSRC20ScriptDto): Object {
    try {
      let resp = createTransferSRC20Script(dto);
      let respFinal: string[] = [];

      for (let item of resp) {
        respFinal.push(item.toString("hex"));
      }

      return {
        data: respFinal,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async createOrdInscImg(dto: CreateOrdInscImgDto): Promise<Object> {
    setupConfig({
      storage: undefined,
      tcClient: undefined,
      netType: dto.network.valueOf(),
    });

    const privateKey = convertPrivateKeyFromStr(dto.privateString);
    const dataBuffer = Buffer.from(dto.data, "hex");

    let utxos: UTXO[] = [];
    dto.utxos.forEach((utxo) => {
      utxo.value = new BigNumber(utxo.value);
      utxos.push(utxo);
    });

    let params = {
      senderPrivateKey: privateKey,
      senderAddress: dto.senderAddress,
      utxos: utxos,
      inscriptions: dto.inscriptions,
      feeRatePerByte: dto.feeRatePerByte,
      receiverAddress: dto.receiverAddress,
      data: dataBuffer,
      contentType: dto.contentType,
    };
    try {
      let resp = await createInscribeImgTx(params);
      return {
        data: resp,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }


  async createOrdInscGeneral(dto: CreateOrdInscGeneralDto): Promise<Object> {
    setupConfig({
      storage: undefined,
      tcClient: undefined,
      netType: dto.network.valueOf(),
    });

    const privateKey = convertPrivateKeyFromStr(dto.privateString);
    const dataBuffer = Buffer.from(dto.data, "hex");

    let utxos: UTXO[] = [];
    dto.utxos.forEach((utxo) => {
      utxo.value = new BigNumber(utxo.value);
      utxos.push(utxo);
    });

    let parentUTXO: UTXO = undefined;
    if (dto.parentUTXO && dto.parentUTXO.tx_hash !== "") {
      parentUTXO = {
        tx_hash: dto.parentUTXO.tx_hash,
        tx_output_n: dto.parentUTXO.tx_output_n,
        value: new BigNumber(dto.parentUTXO.value),
      }
    }

    let params = {
      senderPrivateKey: privateKey,
      senderAddress: dto.senderAddress,
      utxos: utxos,
      inscriptions: dto.inscriptions,
      feeRatePerByte: dto.feeRatePerByte,
      // receiverAddress: dto.receiverAddress,
      data: dataBuffer,
      contentType: dto.contentType,

      metaProtocol: dto.metaProtocol,
      parentInscTxID: dto.parentInscTxID,
      parentInscTxIndex: dto.parentInscTxIndex,
      parentUTXO: parentUTXO,
    };
    try {
      let resp = await createInscribeTxGeneral(params);
      return {
        data: resp,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async xrplInscribeTx(dto: XRPLCreateInscribeTxsDto): Promise<Object> {


    // const privateKey = convertPrivateKeyFromStr(dto.privateString);
    const dataBuffer = Buffer.from(dto.data, "hex");

    let fee;
    if (dto.fee && dto.fee !== "") {
      fee = new BigNumber(dto.fee);
    }


    let params = {
      senderSeed: dto.senderSeed,
      receiverAddress: dto.receiverAddress,
      amount: new BigNumber(dto.amount),
      data: dataBuffer,
      encodeVersion: dto.encodeVersion,
      fee,
      rpcEndpoint: dto.rpcEndpoint,
    }

    try {
      let resp = await xrplCreateInscribeTxs(params);
      return {
        data: resp,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async dogeInscribeTx(dto: DOGECreateInscribeTxsDto): Promise<Object> {
    // const privateKey = convertPrivateKeyFromStr(dto.privateString);
    const dataBuffer = Buffer.from(dto.data, "hex");

    // let fee;
    // if (dto.fee && dto.fee !== "") {
    //   fee = new BigNumber(dto.fee);
    // }


    let params = {
      senderPrivKey: dto.senderPrivKey,
      senderAddress: dto.senderAddress,
      receiverAddress: dto.receiverAddress,
      data: dataBuffer,
      contentType: dto.contentType,
      utxos: dto.utxos,
      feeRate: dto.feeRate,
      rpcEndpoint: dto.rpcEndpoint,
      network: dto.network,
    }

    try {
      let resp = await dogeCreateInscribeTxs(params);
      return {
        data: resp,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}
