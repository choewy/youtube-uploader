import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app';

(async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:30001'],
  });

  SwaggerModule.setup(
    '/api-docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Twitch Clip API')
        .setVersion('0.0.1')
        .addBearerAuth(undefined, 'jwt')
        .build(),
    ),
  );

  await app.listen(30002);
})();
