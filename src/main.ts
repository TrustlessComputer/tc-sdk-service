import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setBTCNetwork } from "tc-js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
