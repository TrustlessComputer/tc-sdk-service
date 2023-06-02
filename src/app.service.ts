import {
  NetworkType,
  convertPrivateKeyFromStr,
  createTx,
  ordCreateInscribeTx,
  setBTCNetwork,
} from "tc-js";

import { BigNumber } from "bignumber.js";
import { CreateTxDto, InscribeTxDto } from "./create-tx.dto";
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
    setBTCNetwork(dto.network.valueOf());

    const privateKey = convertPrivateKeyFromStr(dto.privateString);
    dto.sendAmount = BigNumber(dto.sendAmount);
    dto.utxos.forEach((utxo) => {
      utxo.value = BigNumber(utxo.value);
    });
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
    setBTCNetwork(dto.network.valueOf());

    const privateKey = convertPrivateKeyFromStr(dto.privateString);
    dto.utxos.forEach((utxo) => {
      utxo.value = BigNumber(utxo.value);
    });
    let params = {
      senderPrivateKey: privateKey,
      senderAddress: dto.senderAddress,
      utxos: dto.utxos,
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
}
