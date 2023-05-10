import {Injectable} from '@nestjs/common';
import {createTx} from "tc-js";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createTxFromSDK(): Object {
    let resp = createTx(
      null, [], null, '', null, null, null, false
    )
    return {
      "data": resp
    }
  }
}
