import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para orígenes específicos
  app.enableCors({
    origin: [
      'https://dasboardadmincl.netlify.app/',
      'https://cl-dashboard-jvin.vercel.app/',
      'http://localhost:5173'
    ]
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options:{
         servers: ['nats://34.239.90.112:4222'], // si no funciona usar localhost
         // servers: ['nats://localhost:4222'], // descomentar si se
    }
  })
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
