import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'daily-real-energy-output',
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'daily-real-energy-output',
        allowAutoTopicCreation: true
      }
    }
  })
  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('DailyRealEnergyOutput')
    .setDescription('The DailyRealEnergyOutput API description')
    .setVersion('1.0')
    .addTag('MVP')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3020);
  console.log("-------------------------- DAILY-REAL-ENERGY-OUTPUT -------------------------");
}
bootstrap();
