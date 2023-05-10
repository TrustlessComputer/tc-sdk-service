import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createTx(): Object {
    return {
      "tx": "xxxx"
    }
  }
}
