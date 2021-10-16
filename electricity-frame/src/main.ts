import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    name:"CONSUMPTION_FRAME",
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'consumption-frame',
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'consumption-frame',
        allowAutoTopicCreation: true
        
      }
    }
  })

  await app.startAllMicroservices();
  
  const config = new DocumentBuilder()
    .setTitle('Consumption-verifier')
    .setDescription('The Consumption-verifier API description')
    .setVersion('1.0')
    .addTag('MVP')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3007);
}
bootstrap();