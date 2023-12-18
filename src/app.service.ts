import { CreateTxDto, InscribeTxDto, CreateTxSendMultiDto } from "./create-tx.dto";
import {
  NetworkType,
  convertPrivateKeyFromStr,
  createTx,
  createTxSendBTC,
  ordCreateInscribeTx,
  setBTCNetwork,
  setupConfig,
  PaymentInfo,
  UTXO,
  Network,
} from "tc-js";

import { BigNumber } from "bignumber.js";
import { Injectable } from "@nestjs/common";
import { networks } from "bitcoinjs-lib";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  createTxFromSDK(dto: CreateTxDto): Object {
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
}
