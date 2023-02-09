import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { SharedModule } from './modules/shared/shared.module';
import { IsAuthorizedGuard } from './modules/shared/guards/is-authorized.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const isAuthorizedGuard = app.select(SharedModule).get(IsAuthorizedGuard);
  app.useGlobalGuards(isAuthorizedGuard);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) =>
        new BadRequestException(errors, 'Validation Error'),
    }),
  );
  useContainer(app.select(AppModule), {
    fallback: true,
    fallbackOnErrors: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Nest-postGre')
    .setVersion('v1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
