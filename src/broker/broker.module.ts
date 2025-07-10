import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        }
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class BrokerModule {}